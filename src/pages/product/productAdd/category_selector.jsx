/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react';
import Product           from 'service/product_server.jsx'
import Mutil             from 'util/util.jsx'


const _mm      = new Mutil();
const _product = new Product();


class ProductCategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state={
			firstCategoryList:[],
			firstCategoryId:0 || props.parentCategoryId,
			secondCategoryList:[],
			secondCategoryId:0 || props.categoryId
		}
	}
	//加载一级分类
	componentDidMount(){
       this.loadFirstCategory();
	}
  componentWillReceiveProps(nextProps){
        let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId     : nextProps.categoryId,
                secondCategoryId    : 0
            });
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategoryList();
            });
        }
        
    }
  //加载一级分类
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
  //加载二级分类
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
      if(this.props.readOnly){
            return;
        }
     let newFirstCategoryId=e.target.value || 0;
     this.setState({
		     firstCategoryId:newFirstCategoryId,
         secondCategoryId:0,
         secondCategoryList:[]
     },()=>{
      //更新二级品类列表
       	this.loadSecondCategoryList();
       	this.onPropscategoryChange();
     });
    }
    //选择二级品类触发
    onSecondCategoryChange(e){
      if(this.props.readOnly){
            return;
        }
     let newSecondCategoryId=e.target.value || 0;
     this.setState({
		    secondCategoryId:newSecondCategoryId,
     },()=>{
      	this.onPropscategoryChange();
     });
    }
   //把选中结果传给父组件
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
        	  <select className="form-control cate-select" 
             value={this.state.firstCategoryId}
            onChange={(e)=>{this.onFirstCategoryChange(e)}}
            readOnly={this.props.readOnly}
            >
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
	            (<select className="form-control cate-select"
                onChange={(e)=>{this.onSecondCategoryChange(e)}}
                value={this.state.secondCategoryId} readOnly={this.props.readOnly}>
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