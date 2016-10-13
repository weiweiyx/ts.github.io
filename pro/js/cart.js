$().ready(function(){
	$('.shopBtn').on('tap click',function(){
		location.href="main.html";
	});
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
				var cartHtml="";
				var len=data.length;
				for(var i=0;i<len;i++){
					var tplCart=$('#addCart').html();
					var $tplHtml=tplCart.replace("{{goodsImg}}",data[i].goodsListImg)
												.replace("{{goodsname}}",data[i].goodsName)
												.replace("{{goodsNum}}",data[i].number)
												.replace(/{{goodsID}}/g,data[i].goodsID)
												.replace("{{price}}",data[i].price);
					cartHtml+=$tplHtml;	
				}
				$('table').append(cartHtml);
				bindEvent();
			},
			error:function(error){
				console.log(error);
			}
		});
	}	
	function bindEvent(){
		$('tr').on('tap click','.add,.sub,.delete',function(){
			var price1=0,price2=0,price3=0;
			var delFlag=false;
			var number=0;			
			var index=0;
			
			if($(this).attr('class')==='add'){
				index=$('.add').index(this);
				console.log(index);
				var tmpNum=parseInt($('.quantity').eq(index).val());
				tmpNum++;
				$('.quantity').eq(index).val(tmpNum);
				number=tmpNum;
			}else if($(this).attr('class')==='sub'){
				index=$('.sub').index(this);
				var tmpNum=parseInt($('.quantity').eq(index).val());
				tmpNum--;
				$('.quantity').eq(index).val(tmpNum);
				number=tmpNum;
			}else if($(this).attr('class')==='delete'){
				index=$('.delete').index(this);
				number=0;
				delFlag=true;
			}
			//获取商品的goodID
			var userName=localStorage.getItem('userId');
			var goodsId=$('.goodInfo').eq(index).attr('#goodsID');
			console.log(userName);
			console.log(goodsId);
			//判断是否删除商品
			if(delFlag){
				$('.goodsInfo').eq(index).remove();
			}
			//更新购物车里面的商品
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:{
					userID:userName,
					goodsID:goodsID,
					number:number
				},
				async:true,
				success:function(data){
					if(1===parseInt(data)){
						console.log("购物车更新成功");
					}else if(0===parseInt(data)){
						console.log('购物车更新失败');
					}
				},
				error:function(error){
					console.log(error);
				}
			});
			
		});
	}
});
