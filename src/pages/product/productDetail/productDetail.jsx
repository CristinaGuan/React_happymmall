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

import './detail.scss'

const _mm      =new Mutil();
const _product =new Product();

class ProductDetail extends React.Component{
  constructor(props){
  	super(props);
  	this.state={
        id               : this.props.match.params.pid, //获取/product/detail/:pid?路径中的pid
        name             : '',
        subtitle         : '',
        categoryId       : 0,
        parentCategoryId : 0,
        subImages        : [],
        price            : '',
        stock            : '',
        detail           : '',
        status           : 1 //商品状态1为在售
  	}

  }
  componentDidMount(){
  	this.loadProductDetailById();
  	
  }

  loadProductDetailById(){
  	if(this.state.id){
  	_product.getProductDetail(this.state.id).then(
       (res)=>{
        let images=res.subImages.split(',');  //以,号分割字符串，把字符串转为数组
        //为images数组中每一个元素加上imageHost
        res.subImages=images.map((img)=>{
              return {
              	uri:img,
                url:res.imageHost+img
              }
        });
        this.setState(res);
        console.log(this.state);
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
                  <PageTitle title='商品详情'/>
	                  <div className="form-horizontal">
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品名称</label>
						    <div className="col-md-5">
						     <p className="form-control-static">{this.state.name}</p>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品描述</label>
						    <div className="col-md-5">
						      <p className="form-control-static">{this.state.subtitle}</p>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">所属分类</label>
						    <div className="col-md-5"></div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品价格</label>
						    <div className="col-md-3">
						    	<div className="input-group">
						      <input type="number" className="form-control" value={this.state.price}/>
						      <div className="input-group-addon">元</div>
						    </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品库存</label>
						    <div className="col-md-3">
						      <div className="input-group">
						        <input type="number" className="form-control" value={this.state.stock}/>
						        <div className="input-group-addon">件</div>
						      </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品图片</label>
						    <div className="col-md-10">
						    	{
						    		this.state.subImages.length ?
						    		this.state.subImages.map((img,index)=>{
						    			return (
                                               <div className="img-con" key={index}>
                                                  <img className="img" src={img.url} />
                                               </div>
						    				);
						    		}):(<div>暂无图片</div>)
						    	}
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品详情</label>
						    <div className="col-md-10">
						    	<div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
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

export default ProductDetail;