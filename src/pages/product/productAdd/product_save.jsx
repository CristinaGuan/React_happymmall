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
import RichEditor              from 'util/richEdit/richEdit.jsx'

import Mutil                   from 'util/util.jsx'
import Product                 from 'service/product_server.jsx'

import '../productDetail/detail.scss'

const _mm      = new Mutil();
const _product = new Product();

class ProductSave extends React.Component{
  constructor(props){
  	super(props);
  	this.state={
        id               : this.props.match.params.pid,
        name             : '',
        subtitle         : '',
        categoryId       : 0,
        parentCategoryId : 0,
        subImages        : [],
        price            : 0,
        stock            : 0,
        detail           : '',
        status           : 1 //商品状态1为在售

  	}

  }
  componentDidMount(){
   this.loadProduct();
  }
  //加载商品详细信息
  loadProduct(){
   //有id的时候，表示是编辑功能
   if(this.state.id){
   	 _product.getProductDetail(this.state.id).then(
        (res)=>{
          console.log(res);
          //返回subImages是一个字符串，需要分隔成数组类型
          let images=res.subImages.split(',');
          res.subImages=images.map((imgUrl)=>{
          	return {
          		uri:imgUrl,
          		url:res.imageHost+imgUrl
          	}
          });
          res.defaultDetail=res.detail;
          this.setState(res);
          console.log(res.defaultDetail);
        },
        (errMsg)=>{
         _mm.errorTip(errMsg);
        }
   	 	);
   }
  }
  //品类选择器变化
  onCategoryChange(categoryId,parentCategoryId){
    
    this.setState({
    	categoryId      : categoryId,
    	parentCategoryId: parentCategoryId
    });
  }
  onValueChange(e){
    let name=e.target.name,
        value=e.target.value.trim();
    this.setState({
    	[name]:value
    });
  }

  //上传图片成功
  onUploadSuccess(res){
    let subImages=this.state.subImages;
    subImages.push(res);
    this.setState(
    	{
    		subImages:subImages
    	});
  }
  //上传图片失败
  onUploadError(errMsg){
    _mm.errorTip(errMsg);
  }
  //删除图片
  onImageDelete(e){
    let delIndex=parseInt(e.target.getAttribute('index')),
        subImages=this.state.subImages;
        subImages.splice(delIndex,1); 
     this.setState({
     	subImages:subImages
     });
  }
   //富文本编辑器的变化
  onDetailValueChange(value){
  	this.setState({
  		detail:value
  	});
  }
    getImageString(){
    return  this.state.subImages.map((image)=>image.uri).join(',');
  }
 
  //添加商品事件
  onSubmit(e){
  	let product={
        name             : this.state.name,
        subtitle         : this.state.subtitle,
        categoryId       : parseInt(this.state.categoryId),
        parentCategoryId : parseInt(this.state.parentCategoryId),
        subImages        : this.getImageString(),
        price            : parseFloat(this.state.price),
        stock            : parseInt(this.state.stock),
        detail           : this.state.detail,
        status           : this.state.status
  	 };
   let productCheckResult=_product.checkProductData(product);
    if(this.state.id){
            product.id = this.state.id;
        }
       console.log(product);
       console.log(productCheckResult);
    //表单验证成功,执行提交
    if(productCheckResult.status){
       _product.saveProduct(product).then(
         (res)=>{
            _mm.successTip(res);
         },
         (errMsg)=>{
           _mm.errorTip(errMsg);
         }
       	);
    }else{
     //表单验证失败，调用错误提示函数
     _mm.errorTip(productCheckResult.msg);
    }
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
						    	<input type="text" className="form-control"  placeholder="输入商品名称"
						    	 name="name" value={this.state.name}
						    	 onChange={(e) => this.onValueChange(e)}/>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品描述</label>
						    <div className="col-md-5">
						    	 <input type="text" className="form-control"  placeholder="输入商品描述"
						    	 name="subtitle" value={this.state.subtitle}
						    	 onChange={(e) => this.onValueChange(e)}/>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">所属分类</label>
						    	<ProductCategorySelector 
						    	 onCategoryChange={(categoryId,parentCategoryId)=>{this.onCategoryChange(categoryId,parentCategoryId)}}
						    	 categoryId={this.state.categoryId}
                                 parentCategoryId={this.state.parentCategoryId}
						    	/>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品价格</label>
						    <div className="col-md-3">
						    	<div className="input-group">
						      <input type="number" className="form-control" placeholder="输入价格"
						      name="price" value={this.state.price} onChange={(e) => this.onValueChange(e)}/>
						      <div className="input-group-addon">元</div>
						    </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品库存</label>
						    <div className="col-md-3">
						      <div className="input-group">
						        <input type="number" className="form-control" placeholder="输入库存"
						        name="stock" value={this.state.stock} onChange={(e) => this.onValueChange(e)}/>
						        <div className="input-group-addon">件</div>
						      </div>
						    </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品图片</label>
						    <div className="col-md-10">
						    	{
						    		this.state.subImages.length?
						    	    this.state.subImages.map((image,index)=>{
						    	      return (<div className="img-con" key={index}>
                                        <img className="img" src={image.url} />
                                        <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>)
						    	    }):(<div>请上传图片</div>)
						    	}

						    </div>
						    <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg)=>this.onUploadError(errMsg)}/>
                        </div>
						  </div>
						  <div className="form-group">
						    <label className="col-md-2 control-label">商品详情</label>
						    <div className="col-md-10">
						      <RichEditor 
						      detail={this.state.detail}
						      defaultDetail={this.state.defaultDetail}
						      onValueChange={(value)=>{this.onDetailValueChange(value)}}></RichEditor>
						    </div>
						  </div>
						  <div className="col-md-2 col-md-offset-2">
						  	<button type="button" className="btn btn-default" onClick={(e)=>{this.onSubmit(e)}}>提交</button>
						  </div>
						  
					</div>
            	</div>
            </div>
          	
          </div>
      );
  }
}

export default ProductSave;