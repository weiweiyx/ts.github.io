$().ready(function(){
	$('footer').load('footer.html');
	$('.btn').click(function(){
		var user=$('.user').val();
		var password=$('.pwd').val();
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"login",
				userID:user,
				password:password
			},
			success:function(data){
				console.log($('.user').val());
				if(data==0){
					$('.check').html('用户名不存在');
				}else if(data==2){
					$('.check').html('用户名与密码不相符');
				}else{
					location.href="me.html";					
					localStorage.setItem('userId',user);
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	});
	
	$('.register').on('tap click',function(){
		location.href="register.html";
	});
	
});
