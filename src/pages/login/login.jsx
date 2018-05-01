import React from 'react'
import Mutil from 'util/util.jsx'
import User  from 'service/user_service.jsx'
import {BrowserRouter,HashRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
const _mm   = new Mutil();
const _user = new User();

class Login extends React.Component{
	constructor(props){
		super(props);
    this.state={
      username:'',
      password:'',
      redirect:_mm.getUrlParam('redirect') || '/'
    } 
	}
  componentWillMount(){
    document.title='登录-MMALL ADMIN';
  }
  //登录表单发生改变
  onInputChange(e){
    let inputName=e.target.name, //获取input标签的name
        inputValue=e.target.value; //获取input输入的值
    this.setState({ 
      [inputName]:inputValue
    });
  }
 //当用户提交表单
  onSubmit(){
    let loginInfo={
       username:this.state.username,
       password:this.state.password
       },checkResult=_user.checkLoginInfo(loginInfo);
    // 表单验证方法:checkLoginInfo()
      //验证通过
    if(checkResult.status){
      _user.login(loginInfo).then((res)=>{
         _mm.setStroage('userInfo',res);
          console.log(res);
          this.props.history.push(this.state.redirect);
        },(errMsg)=>{
           _mm.errorTip(errMsg);
         });
    }else{
      // 验证不通过
      _mm.errorTip(checkResult.msg);
    }
     
  }
  //enter键提交登录
  onKeyUp(e){
    if(e.keyCode===13){
       this.onSubmit();
    }
  }
  

  

  render(){
  	return (
      <div className="col-md-4 col-md-offset-4" style={{marginTop:'15%'}}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">登录</h3>
           </div>
           <div className="panel-body">
              <div>
                  <div className="form-group">
                    <input type="text" className="form-control"  placeholder="请输入用户名"
                  name="username"  onChange={e=>{this.onInputChange(e)}} onKeyUp={e=>{this.onKeyUp(e)}}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control"  placeholder="请输入密码"
                  name="password"  onChange={e=>{this.onInputChange(e)}} onKeyUp={e=>{this.onKeyUp(e)}}/>
                  </div>
                  <button className="btn btn-primary btn-md btn-block"
                  onClick={e=>{this.onSubmit(e)}}>登录</button>
              </div>
           </div>
        </div>
      </div>
        
        
  		)
  }
}

export default Login;