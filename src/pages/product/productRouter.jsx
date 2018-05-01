/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

class ProductRouter{
  
  render(){
    return (
           <Switch>
               <Route path="/product/index" component={Login}/>
               <Redirect exact from="/product" to="/product/index"/>
            </Switch>

      );
  }
}

export default ProductRouter;