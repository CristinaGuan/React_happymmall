import Mutil from "../util/util.jsx";
const _mm = new Mutil();

class User{
	login(loginInfo){
	  return _mm.request({
          type:'POST',
          url:'/manage/user/login.do',
          data:loginInfo
     })
	}
	//检查登录接口的数据是否合法
	checkLoginInfo(loginInfo){
	 let username=$.trim(loginInfo.username);  //$.trim()删除字符串开始和末尾的空格
	 let password=$.trim(loginInfo.password);
     if(typeof username!=='string' || username.length===0){
       return {
       	status:false,
       	msg:'用户名不能为空'
       }
     }
     if(typeof password!=='string' || password.length===0){
       return {
       	status:false,
       	msg:'密码不能为空'
       }
     }

     return {
     	status:true,
     	msg:'登录成功'
     }
	}

	logout(){
		return _mm.request({
			type:'post',
			url:'/user/logout.do'
		});
	}
 //请求用户列表接口
  getUserList(pageNum){
    return _mm.request({
      type:'post',
      url:'/manage/user/list.do',
      data:{pageNum:pageNum}
    });
  }
}
export default User;