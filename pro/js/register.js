$().ready(function(){
	$('footer').load('footer.html');
	$('.login').on('tap click',function(){
		location.href="register.html";
	});
	var baseUrl = "http://datainfo.duapp.com/shopdata/";
	var tmpUrl = "userinfo.php";
	
	$('.btn').click(function(){
		var user=$('.user').val();
		var pwdC=$('.pwd').val();
		var pwdCf=$('.confirm').val();
		$('.check').html('');
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"register",
				userID:user,
				password: pwdC
			},
			success:function(data){
				console.log(data);
				if(data=='1'){
					location.href="logoin.html";
					localStorage.setItem('userId',user);
				}else if(data=='0'){
					$('.check').html('您的用户名已存在');
				}else if(data=='2'){
					console.log("error");
				}
			},
			error:function(error){
				console.log(error);
			}
		});
	
	});
	
	$('.pwd').blur(function(){
		var pwdC=$('.pwd').val();
		var regExp=/^[A-Za-z]\w{5,9}$/;
		$('.check').html('');
		if(!regExp.test(pwdC)){
			$('.pwd').html('');
			$('.btn').attr('disabled',true);
			$('.check').html('密码请使用数字或者字母,首位是字母');
		}else{
			$('.btn').attr('disabled',false);
		}
	});
	$('.pwd').focus(function(){
		$('.pwd').val('');
	});
	$('.confirm').blur(function(){
		$('.check').html(' ');
		var pwd=$('.pwd').val();
		var confirm=$('.confirm').val();
		if(pwd==confirm){
			$('.btn').attr('disabled',false);
		}else{
			$('.btn').attr('disabled',true);
			$('.check').html('两次密码不一致');
		}
	});
	
	
		
		
		
});