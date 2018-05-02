/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React     from 'react';
import PageTitle from 'component/pageTitle/pageTitle.jsx'
import ProductCategorySelector from 'page/product/productAdd/category_selector.jsx'
import FileUploader  from 'util/fileUpload/fileUpload.jsx'

class ProductSave extends React.Component{
  constructor(props){
  	super(props);
  	this.state={
     categoryId:0,
     parentCategoryId:0
  	}
  }
  onCategoryChange(categoryId,parentCategoryId){
    console.log('categoryId'+categoryId,'parentCategoryId'+parentCategoryId);
  }
  render(){
    return (
          <div id="page-wrapper">
            <div className="row">
            	<div className="col-md-12">	
                  <PageTitle title='添加商品'/>
	                  <div className="form-horizontal">
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品名称</label>
						    <div className="col-md-5">
						    	<input type="text" className="form-control"  placeholder="输入商品名称"/>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品描述</label>
						    <div className="col-md-5">
						    	 <input type="text" className="form-control"  placeholder="输入商品描述"/>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">所属分类</label>
						    	<ProductCategorySelector onCategoryChange={
						    		(categoryId,parentCategoryId)=>{this.onCategoryChange(categoryId,parentCategoryId)}
						    	}/>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品价格</label>
						    <div className="col-md-3">
						    	<div className="input-group">
						      <input type="number" className="form-control" placeholder="输入价格"/>
						      <div className="input-group-addon">元</div>
						    </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品库存</label>
						    <div className="col-md-3">
						      <div className="input-group">
						        <input type="number" className="form-control" placeholder="输入库存"/>
						        <div className="input-group-addon">件</div>
						      </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品图片</label>
						    <div className="col-md-10">
						    	<FileUploader/>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品详情</label>
						    <div className="col-md-10">
						    	dddd
						    </div>
						  </div>
						  <div className="col-md-4">
						  	<button type="button" className="btn btn-default">提交</button>
						  </div>
						  
					</div>
            	</div>
            </div>
          	
          </div>
      );
  }
}

export default ProductSave;