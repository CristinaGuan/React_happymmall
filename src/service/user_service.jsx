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



}
export default User;