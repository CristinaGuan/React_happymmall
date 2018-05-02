/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react';
import Product           from 'service/product_server.jsx'
import Mutil             from 'util/util.jsx'

import './category_selector.scss'


const _mm      = new Mutil();
const _product = new Product();


class ProductCategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state={
			firstCategoryList:[],
			firstCategoryId:0,
			secondCategoryList:[],
			secondCategoryId:0
		}
	}
	//加载一级分类
	componentDidMount(){
       this.loadFirstCategory();
	}
	loadFirstCategory(){
      _product.getCategoryList(this.state.firstCategoryId).then(
         (res)=>{
         	// console.log(res);
           this.setState({
           	 firstCategoryList:res
           });
         },
         (errMsg)=>{
           _mm.errorTip(errMsg);
         }
      	);
	}
    loadSecondCategoryList(){
    	// console.log(this.state.firstCategoryId);
       _product.getCategoryList(this.state.firstCategoryId).then(
         (res)=>{
         	// console.log(res);
           this.setState({
           	 secondCategoryList:res
           });
         },
         (errMsg)=>{
           _mm.errorTip(errMsg);
         }
      	);
    }
    //选择一级品类触发事件
    onFirstCategoryChange(e){
     let newFirstCategoryId=e.target.value || 0;
     this.setState({
		firstCategoryId:newFirstCategoryId,
     },()=>{
     	this.loadSecondCategoryList();
     	this.onPropscategoryChange();
     });
    }
    onSecondCategoryChange(e){
     let newSecondCategoryId=e.target.value || 0;
     this.setState({
		secsecondCategoryId:newSecondCategoryId,
     },()=>{
     	this.onPropscategoryChange();
     });
    }

    onPropscategoryChange(){
      //判断props的onCategoryChange函数是否存在，存在就调用并传值
      let categoryChangeble=typeof this.props.onCategoryChange==='function';
      //有二级分类的情况下，把一级和二级的ID都传给父级
      if(this.state.secsecondCategoryId){
      	categoryChangeble && this.props.onCategoryChange(this.state.secsecondCategoryId,this.state.firstCategoryId);
      }else{
      	//只有一级分类的情况下，二级分类ID默认为0
      	categoryChangeble && this.props.onCategoryChange(this.state.firstCategoryId,0);
      }
    }
    
    render(){
        return (
        	<div className="col-md-10">
        	  <select className="form-control cate-select" name="" onChange={(e)=>{this.onFirstCategoryChange(e)}}>
        	   <option value="">请选择一级分类</option>
        	  {
        	  	this.state.firstCategoryList.map((firstCategory,index)=>{
        	  		return (
                        <option value={firstCategory.id} key={index}>{firstCategory.name}</option>
        	  			)
        	  	})
        	  }
	          </select>
	          {/*判断二级分类是否为空*/}
	          {this.state.secondCategoryList.length ?
	            (<select className="form-control cate-select" name="" onChange={(e)=>{this.onSecondCategoryChange(e)}}>
	    	      <option value="">请选择二级分类</option>
	    	      {
        	  	    this.state.secondCategoryList.map((secondCategory,index)=>{
        	  		return (
                        <option value={secondCategory.id} key={index}>{secondCategory.name}</option>
        	  			)
        	  	  })
        	     }
	            </select> ):null
	         }
	        </div>   
        );
    }
}

export default ProductCategorySelector;