/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Home   from 'page/home/index.jsx';
import Login  from 'page/login/login.jsx';
import Layout from 'component/layout/layout.jsx';
import Error  from 'page/error/error.jsx';
import UserList from 'page/user/user.jsx';
import ProductRouter from 'page/product/productRouter.jsx'
import Order   from 'page/order/order.jsx'
import OrderDetail   from 'page/order/orderDetail/orderDetail.jsx'

class App extends React.Component{
  
  render(){
    let layoutRouter=(
     <Layout>
           <Switch>
               <Route exact path="/" component={Home}/>
               <Route path="/product" component={ProductRouter}/>
               <Route path="/product-category" component={ProductRouter}/>
               <Route path="/order" component={Order}/>
               <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
               <Route path="/user/index" component={UserList}/>
               <Redirect exact from="/user" to="/user/index"/>
               <Route component={Error}/>
           </Switch>
    </Layout>

    );
    return (
         <Router>
           <Switch>
               <Route path="/login" component={Login}/>
               <Route path="/" render={props=>(layoutRouter)}/>
            </Switch>
         </Router>

       
      );
  }
}

ReactDOM.render(
	<div>
    <App/> 
  </div>,
     document.getElementById('app')

	)