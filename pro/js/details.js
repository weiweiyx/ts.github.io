$().ready(function() {
	var tmpGoodsId = sessionStorage.getItem("tmpGoodId");
	var dataJson = {
		"goodsID": tmpGoodsId,
	}
	$.ajax({
		type: "get",
		url: "http://datainfo.duapp.com/shopdata/getGoods.php",
		data: dataJson,
		dataType: "JSONP",
		success: function(data) {
			var detailsSwiper = new Swiper('.detailContainer', {
				pagination: ".swiper-pagination",
				paginationClickable: true,
				onInit: function() {
					console.log(data);
					$('.detail').find('img').attr('src', data[0].goodsListImg);
					$('.detail').find('span').eq(0).html("￥" + data[0].price);
					$('.detail').find('span').eq(1).html(data[0].className);
					$('.detail').find('del').html("￥" + data[0].price);
					$('.detail').find('span').eq(3).html(data[0].discount + "折");
					$('.detail').find('span').eq(4).html(data[0].buynumber + "人购买");
				},
				onSlideChangeEnd: function(swiper) {
					var dataImg = JSON.parse(data[0].goodsBenUrl);
					$('.detailIntroduce').find('img').attr('src', dataImg[0]);
					$('.footer').find('span').removeClass('active').eq(detailsSwiper.activeIndex).addClass('active');
					if(detailsSwiper.activeIndex === 2) {
						var mySwiper = new Swiper('.swiperPhoto', {
							pagination: ".photoPagination",
							onInit: function() {
								for(var i = 0; i < dataImg.length; i++) {
									$('.swiperPhoto').find('img').eq(i).attr('src', dataImg[i]);
								}
							}
						});
					}

				}
			});
			$('footer').on('tap click', 'span', function() {
				$('.active').removeClass('active');
				$(this).addClass('active');
				detailsSwiper.slideTo($(this).index(), 1000, false);
			});
		},
		error: function(error) {
			console.log(error);
		}

	});

	function createDetail(data) {
		var tpl = $('#details').html();
		var htmlStr = tpl.replace('{{img1}}', data.imgsUrl)
			.replace('{{price}}', data.price)
			.repeat('{{sale}}', data.discount)
			.replace('{{product}}', data.goodsName)
			.replace('{{proPrice}}', data.price)
			.replace('{{people}}', data.buynumber);
		return htmlStr;
	}

});