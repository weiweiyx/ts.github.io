$().ready(function() {

	var classId = [];
	var iconArr = [];
	var index = 0;
	$('.pageCout').hide();
	$('.pagination').hide();
	function inti() {
		$.ajax({
			type: "get",
			url: "http://datainfo.duapp.com/shopdata/getGoods.php",
			data: {
				classID: "1"
			},
			dataType: "JSONP",
			success: function(data) {
				$('.cMain').html('');
				for(var i = 0; i < data.length; i++) {
					$('.cMain').eq(0).append(createList(data[i]));
				}
			},
			error: function(error) {
				console.log(error);
			}

		});
	}

function initList(){
	$.ajax({
		type: "get",
		url: "http://datainfo.duapp.com/shopdata/getclass.php",
		success: function(data) {
			data = JSON.parse(data);
			for(var i = 0; i < data.length; i++) {
				iconArr.push(data[i].icon);
				//				console.log(data[i].icon);
				classId.push(data[i].classID);

			}
			console.log(classId);
			var mySwiper = new Swiper('.pageCout', {
				initialSlide:index,
				onInit:function(swiper){
					inti();
				},
				pagination: '.pagination',
				paginationClickable: true,
				paginationBulletRender: function(index, className) {
					//				className="icon iconfont";
					return '<span class="' + className + ' icon iconfont">' + iconArr[index] + '</span>';
				},
				onSlideChangeEnd: function(swiper) {
					$.ajax({
						type: "get",
						url: "http://datainfo.duapp.com/shopdata/getGoods.php",
						data: {
							classID: classId[mySwiper.activeIndex]
						},
						dataType: 'JSONP',
						success: function(data) {
							$('.cMain').html('');
							for(var i = 0; i < data.length; i++) {
								$('.cMain').append(createList(data[i]));
							}
						},
						error: function(error) {
							console.log(error);
						}
					});
				}
			});
		},
		error: function(error) {
			console.log(error);
		}
	});
}
	
	
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		success:function(data){
			data=JSON.parse(data);
			for(var i=0;i<data.length;i++){
				$('.ctList').append(createSpan(data[i]));
			}
		},
		error:function(error){
			console.log(error);
		}
	});
	
	$('.ctList').on('tap click','li',function(){
		var index=$(this).index();
		$('.ctList').hide();
		$('.hp').hide();
		$('.pageCout').show(function(){
			
		});
		$('.pagination').show(function(){
			console.log(index);
			initList(index);
		});
	});
	
	
	
	
	function createSpan(data){
		var tpl=$('#createSpan').html();
		var htmlStr=tpl.replace('{{name}}',data.className)
			.replace('{{icon}}',data.icon);
		return $(htmlStr);
	}

	function createList(data) {
		var tpl = $('#createList').html();
		var htmlStr = tpl.replace('{{img}}', data.goodsListImg)
			.replace('{{name}}', data.className)
			.replace('{{price}}', data.price)
			.replace('{{sale}}', data.price);
		return $(htmlStr);
	}
});