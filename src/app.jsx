/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
import Home   from 'page/home/index.jsx'
import Login  from 'page/login/login.jsx'
import Layout from 'component/layout/layout.jsx'

class App extends React.Component{
  render(){
    return (
         <Router>
           <Switch>
               <Route path="/login" component={Login}/>
               <Route path="/" render={props=>(
                   <Layout>
                      <Switch>
                         <Route exact path="/" component={Home}></Route>
                         <Route exact path="/product" component={Home}></Route>
                         <Route exact path="/product-category" component={Home}></Route>
                         <Route exact path="/order" component={Home}></Route>
                        <Route exact path="/user" component={Home}></Route>
                      </Switch>
                   </Layout>
                )}/>
            </Switch>
         </Router>
       
      );
  }
}

ReactDOM.render(
	<div>
    <Login/> 
  </div>,
     document.getElementById('app')

	)