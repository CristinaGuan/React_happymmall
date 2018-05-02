class Mutil{
 request(param){
 	return  new Promise((resolve,reject)=>{
  $.ajax({
 		type      :'post'         || param.type,
 		url       :param.url      || '',
 		dataType  :param.dataType || 'json',
 		data      :param.data     || null,
 		success   :(res)=>{
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
 		error    :(err)=>{
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
          result=queryString.match(reg);//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
          //result:['param1=123','','123','&']
      return (result ? decodeURIComponent(result[2]):null);
 	}
  //成功的提示
  successTip(successMsg){
    alert(successMsg);
  }
 	//错误提示
 	errorTip(errMsg){
      console.log('错误啦');
      alert(errMsg || '好像哪里不对');
 	}
  //对用户登录信息进行本地存储
  setStroage(name,data){
    let dataType=typeof data;
    if(dataType==='object'){
      window.localStorage.setItem(name,JSON.stringify(data));//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
    }else if(['number','string','boolean'].indexOf(dataType)){
       window.localStorage.setItem(name,data);
    }else{
      alert('该类型不能用于本地存储');
    }

  }
//取出本地存储的内容
  getStorage(name){
    let data=window.localStorage.getItem(name);
    if(data){
      return JSON.parse(data);
    }else{
      return '';
    }
  }

  //删除本地存储，退出登录时
  removeStorage(name){
    window.localStorage.removeItem(name);  //调用window.localStorage.removeItem()
  }
}

export default Mutil;