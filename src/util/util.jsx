class Mutil{
 request(param){
 	return  new Promise((resolve,reject)=>{
        $.ajax({
 		type      :'post'          || param.type,
 		url       :param.url      || '',
 		dataType  :param.dataType || 'json',
 		data      :param.data     || null,
 		success(res){
 			//请求成功
 			if(0===res.status){
              typeof resolve==='function' && resolve(res.data,res.msg);  //判断resolve是否是一个方法，不是的话就不会执行后面的resolve()
 			}else if(10===res.status){
 				//做登录
               this.doLogin();
 			}else{
             typeof reject==='function' && reject(res.msg || res.data);
 			}
 	    },
 		error(err){
 			typeof reject==='function' && reject(err.statusText);
 		}
      });
 	});
 		
 	}
 	//跳转到登陆
 	doLogin(){
 		window.location.href='/login?redirect='+encodeURIComponent(window.location.pathname);
 	}
 	//获取url参数
 	getUrlParam(name){
      //xxxx.com？param1=123&param2=456
      let queryString=window.location.search.split('?')[1] || '',
          reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)"),
          result=queryString.match(reg);
      return (result ? decodeURIComponent(result[2]):null);
 	}
 	//错误提示
 	errorTip(errMsg){
      alert(errMsg || '好像哪里不对');
 	}
}

export default Mutil;