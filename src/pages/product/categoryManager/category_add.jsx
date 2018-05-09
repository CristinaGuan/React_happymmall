/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React                   from 'react';
import PageTitle               from 'component/pageTitle/pageTitle.jsx'
import ProductCategorySelector from 'page/product/productAdd/category_selector.jsx'
import FileUploader            from 'util/fileUpload/fileUpload.jsx'
import Product                 from 'service/product_server.jsx'
import Mutil                   from 'util/util.jsx'

import './category.scss'

const _mm      =new Mutil();
const _product =new Product();

class CategoryAdd extends React.Component{
  constructor(props){
  	super(props);
  	this.state={
      parentCategoryId: 0,
      categoryList:[],
      categoryName:''
  	}

  }
  componentDidMount(){
    this.loadParentCategory();
  }

  loadParentCategory(){
   _product.getCategoryList(this.state.parentCategoryId).then(
    (res)=>{
      // console.log(res);
      this.setState({
      categoryList:res
      });
    },
    (errMsg)=>{
      _mm.errorTip(errMsg);
     }
    );
  }
  onCategoryIdValueChange(e){
    let newParentCategoryId=e.target.value;
    this.setState({
      parentCategoryId:newParentCategoryId
    });
  }
  onCategoryNameChange(e){
    let newCategoryName=e.target.value;
    this.setState({
      categoryName:newCategoryName
    });
  }
  onKeyUp(e){
    if(e.keyCode===13){
       this.onCategoryNameChange();
    }
  }
  onSubmit(e){
    let categoryname=$.trim(this.state.categoryName);
    if(typeof categoryname!=='string' || categoryname.length===0){
       alert('品类名不能为空');
    }else{
      let subData={
      parentId:this.state.parentCategoryId,
      categoryName:categoryname
      }
    
    _product.submitCategory(subData).then(
      (res)=>{
        _mm.successTip(res);
      },
      (errMsg)=>{
        _mm.errorTip(errMsg);
      }
      );
  }
  }
  render(){
    return (
          <div id="page-wrapper">
            <div className="row">
            	<div className="col-md-12">	
                  <PageTitle title='品类管理--添加品类'/>
	                  <div className="form-horizontal">
						    <div className="form-group">
						      <label className="col-md-2 control-label">所属分类</label>
						    	<select className="form-control cate-select" name="" onChange={(e)=>{this.onCategoryIdValueChange(e)}}>
                   {
                    this.state.categoryList.map((category,index)=>{
                      return (
                             <option value={category.id} key={index}>{category.name}</option>
                           )
                    })
                   }
                  </select>
						   </div>
						   <div className="form-group">
						    <label className="col-md-2 control-label">品类名称</label>
						    <div className="col-md-4">
						    	<input type="text" className="form-control"  placeholder="输入品类名称" 
                         onChange={(e)=>{this.onCategoryNameChange(e)}}
                         onKeyUp={(e)=>{this.onKeyUp(e)}}/>
						    </div>
						  </div>
						  <div className="col-md-4">
						  	<button type="button" className="btn btn-default" onClick={(e)=>{this.onSubmit(e)}}>提交</button>
						  </div>
						  
					</div>
            	</div>
            </div>
          	
          </div>
      );
  }
}

export default CategoryAdd;