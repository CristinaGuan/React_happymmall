/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React         from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import ProductList   from  'page/product/productIndex/pro_index.jsx'
import ProductSave   from  'page/product/productAdd/product_save.jsx'
import CategoryList  from 'page/product/categoryManager/categoryManager.jsx'
import CategoryAdd   from 'page/product/categoryManager/category_add.jsx'
import ProductDetail from 'page/product/productDetail/productDetail.jsx'

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid?" component={ProductDetail}/>
                <Route path="/product-category/index" component={CategoryList}/>
                <Route path="/product/category-add/:pid?" component={CategoryAdd}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="product-category/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;