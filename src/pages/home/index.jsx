import React from 'react'
import 'component/layout/theme.css'
import PageTitle from 'component/pageTitle/pageTitle.jsx'
import {Link} from 'react-router-dom'
import './home.scss'
import Mutil from 'util/util.jsx'
import Statistic from 'service/statistic_server.jsx'
const _mm   = new Mutil();
const _statistic = new Statistic();

class Home extends React.Component{
  constructor(props){
   super(props);
   this.state={
    userCount:   '--', 
    productCount:'--',
    orderCount:  '--'
   }
  }
  componentDidMount(){
    this.loadCount();
  }
  //请求接口
  loadCount(){
      _statistic.getHomeCount().then(res=>{
         this.setState(res);
      },err=>{
      _mm.errorTip(errMsg);
    });
  }
   render(){
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="首页">
                <div className="row">
                  <div className="col-md-4">
                    <Link to="/user" className="color-box brown">
                    <p className="count">{this.state.userCount}</p>
                    <p className="desc">
                      <i className="fa fa-user-o"></i>
                      <span>用户总数</span>
                    </p>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/product" className="color-box green">
                    <p className="count">{this.state.productCount}</p>
                    <p className="desc">
                      <i className="fa fa-user-o"></i>
                      <span>商品总数</span>
                    </p>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/order" className="color-box blue">
                    <p className="count">{this.state.orderCount}</p>
                    <p className="desc">
                     <i className="fa fa-user-o"></i>
                      <span>订单总数</span>
                    </p>
                    </Link>
                  </div>
                </div>
              </PageTitle>
           </div>
        </div>

   		)
   }
} 
export default Home;
