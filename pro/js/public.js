$().ready(function(){
	addFooter();
	var userName=localStorage.getItem("userId");
	if(userName!=null){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			data:{
				userID:userName
			},
			dataType:"JSONP",
			success:function(data){
				var cartNumber=0;
				console.log(data[0].number);
				for(var i=0;i<data.length;i++){
					cartNumber+=parseInt(data[i].number);
				}
				$('.cartNum').show().html(cartNumber);
			},
			error:function(error){
				console.log(error);
			}
		});
	}
	
});

function addFooter(){
		$('footer').load('footer.html',function(){
		
		$(this).on('tap click', '.item',function() {
			var index = $(this).index();
			$('.activeAll').removeClass('activeAll');
			
			switch(index){
				case 0:
					$('.item').eq(0).addClass('activeAll');
					location.href="main.html";					
					break;
				case 1:
					$('.item').eq(1).addClass('activeAll');
					location.href="classify.html";					
					break;
				case 2:
					$('.item').eq(2).addClass('activeAll');
					location.href="cart.html";					
					break;
				case 3:
					$('.item').eq(3).addClass('activeAll');
					location.href="me.html";					
					break;
				case 4:
					$('.item').eq(4).addClass('activeAll');
					location.href="main.html";					
					break;
			}
		});
		
	});
	}
