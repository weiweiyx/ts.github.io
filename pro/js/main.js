$().ready(function() {
	addFooter();

	var baseUrl = "http://datainfo.duapp.com/shopdata/";
	var tmpUrl = "selectGoodes.php";
	var shopUrl = "getGoods.php";
	var search = $('#search').value;
	var goodsId = [];
	//首页上出现的商品列表
	$.ajax({
		type: "get",
		url: baseUrl + shopUrl,
		dataType: "jsonp",
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$('.listPro').find('.swiper-wrapper').append(createLi(data[i]));
				goodsId.push(data[i].goodsID);
			}

			var num = 0;
			var swiperSlide = new Swiper('.listPro', {
				direction: 'vertical',
				observer: true,
				slidesPerView: 'auto',
				freeMode: true,
				onSlideChangeEnd: function(swiper) {
					if(swiperSlide.isEnd) {
						num++;
						$.ajax({
							type: "get",
							url: "http://datainfo.duapp.com/shopdata/selectGoodes.php",
							data: {
								pageCode: num
							},
							dataType: "jsonp",
							success: function(data) {
								console.log(data);
							},
							error: function(error) {
								console.log(error);
							}
						});
					}
				}
			});
			//商品详情
			$('.listPro').on('tap click', '.photoPro,.shopDetail', function() {
				var index = swiperSlide.clickedIndex;
				var tmpGoodId = goodsId[index];
				sessionStorage.setItem('tmpGoodId', tmpGoodId);
				location.href = "detail.html";
			});
			//添加购物车
			$('.cartBtn').on('tap click', function() {
				if(localStorage.getItem("userId") != null) {
					var userName = localStorage.getItem("userId");
					var cartGoodId = goodsId[swiperSlide.clickedIndex];
					$.ajax({
						type: "post",
						url: "http://datainfo.duapp.com/shopdata/updatecar.php",
						data: {
							userID: userName,
							goodsID: cartGoodId
						},
						success: function(data) {
							var cartNumber = parseInt($('.cartNum').html());
							if(data == 1) {
								cartNumber++;
								console.log('添加购物车成功');
								$('.cartNum').html(cartNumber);
							} else {
								console.log("添加购物车失败");
							}
						},
						error: function(error) {
							console.log(error);
						}
					});
				} else {
					location.href = "me.html";
				}
			});

		},
		error: function(error) {
			console.log(error);
		}
	});

	$.ajax({
		type: "get",
		url: "http://datainfo.duapp.com/shopdata/selectGoodes.php",
		data: {
			pageCode: "1"
		},
		dataType: "JSONP",
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
			console.log(error);
		}
	});

	var swiperPhoto = new Swiper('.swiperBanner', {
		autoplay: 1000,
		loop: false,
		pagination: '.swiper-pagination',
		onInit: function() {
			$.ajax({
				type: "get",
				url: "http://datainfo.duapp.com/shopdata/getBanner.php",
				dataType: "JSONP",
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						$('.lunbo').find('img').eq(i).attr('src', JSON.parse(data[i].goodsBenUrl)[0]);
					}
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
	});

	//搜索事件
	$('.search').on('tap click', function() {
		$('#search').val('');
		$('#search').blur(function() {
			var searchText = $('#search').val();
			if(searchText != null) {
				$('.lunbo').hide();
				var ecdSearch = encodeURI(searchText);
				$.ajax({
					type: "get",
					url: "http://datainfo.duapp.com/shopdata/selectGoodes.php",
					data: {
						selectText: ecdSearch
					},
					dataType: "JSONP",
					success: function(data) {
						console.log(data);
						for(var i = 0; i < data.length; i++) {
							$('.listPro').find('.swiper-wrapper').html('');
							$('.listPro').find('.swiper-wrapper').append(createLi(data[i]));
						}
					},
					error: function(error) {
						console.log(error);
					}
				});
			}
		});
	});

	function createLi(data) {
		var tpl = $('#module').html();
		var htmlStr = tpl.replace('{{img}}', data.goodsListImg)
			.replace('{{info}}', data.goodsName)
			.replace('{{price}}', data.price)
			.replace('{{del}}', data.price)
			.replace('{{sale}}', data.discount);

		return $(htmlStr);
	}

});