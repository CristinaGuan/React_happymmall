import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from 'component/pageTitle/pageTitle.jsx'
import './error.scss'

class Error extends React.Component{
  constructor(props){
   super(props);
  }
 
   render(){
   	return (
       <div>
       	   <div id="page-wrapper" className="errorPage">
              <PageTitle title="出错啦！"/>
                <div className="row">
                  <div className="col-md-12">
                    <span>找不到该路径,</span><Link to="/">点我返回首页！</Link>
]                  </div>
                </div>
           </div>
        </div>

   		)
   }
} 
export default Error;
