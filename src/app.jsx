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
import ProductList  from 'page/product/productIndex/pro_index.jsx';

class App extends React.Component{
  
  render(){
    let layoutRouter=(
     <Layout>
           <Switch>
               <Route exact path="/" component={Home}/>
               <Route path="/product" component={ProductList}/>
               <Route path="/product-category" component={Home}/>
               <Route path="/order" component={Home}/>
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