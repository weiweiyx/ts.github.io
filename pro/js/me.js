$().ready(function(){
	$('.login').on('tap click',function(){
		location.href="logoin.html"
	});
	$('.register').on('tap click',function(){
		location.href="register.html";
	});
	
	var userName=localStorage.getItem("userId");
	
	if (userName!=null){
		$('.userName').html(userName);
		$('.login').html("退出");
		$('.register').hide();
		$('.login').on('tap click',function(){
			localStorage.removeItem("userId");
			$('.userName').html("昵称");
			$('.login').html("登录");
			$('.register').show();
			location.href="me.html";
		});
	}
});
