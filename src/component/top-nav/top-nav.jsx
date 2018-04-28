import React from 'react'
import 'component/layout/theme.css'
import {Link} from 'react-router-dom'

class TopNav extends React.Component{
	constructor(props){
		super(props);
	}
  //这是退出登录
  onLogout(){

  }
  render(){
  	return (
      <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
          
                <li className="dropdown">
                    <a className="dropdown-toggle"  href="javascript:;">
                        <i className="fa fa-user fa-fw"></i> 
                        <span>欢迎，adminxxxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                        <a onClick={()=>{this.onLogout()}}>
                           <i className="fa fa-sign-out fa-fw"></i>
                           <span>退出登录</span>
                        </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        
  		)
  }
}

export default TopNav;