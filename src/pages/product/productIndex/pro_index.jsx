import React                  from 'react'
import {Link}                 from 'react-router-dom'
import PageTitle              from 'component/pageTitle/pageTitle.jsx'
import Pagination             from 'util/pagination/pagination.jsx';
import TableList              from 'util/generaldutyTable/table.jsx'
import ProductSearchComponent from 'page/product/productIndex/product_searchComponent.jsx'
import ProductSave            from  'page/product/productAdd/product_save.jsx'

import Mutil                  from 'util/util.jsx'
import Product                from 'service/product_server.jsx'

import './pro_index.scss'

const _mm      = new Mutil();
const _product = new Product();

class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state={
         pageNum:1,
         list:[],
         listType:'list'
   }
  }
  //componentDidMount()在组件被装配后立即调用
  componentDidMount(){
   this.loadProductList();
  }
  //请求商品列表数据
  loadProductList(){
  	let listParam={};
  	listParam.listType=this.state.listType;
  	listParam.pageNum=this.state.pageNum;
  	//如果是搜索的话，需要传入搜索类型和关键字
  	if(this.state.listType==='search'){
  	  listParam.searchType=this.state.searchType;
  	  listParam.keyWord=this.state.searchKeyWord;
  	}
  	//请求接口
    _product.getProductListData(listParam).then((res)=>{
      // console.log(res);
      this.setState(res);
      },(errMsg)=>{
          this.setState({
            list:[]
          });
         _mm.errorTip(errMsg);
    });
  }
  //修改商品在售或下架状态
  onSetProductStatus(e,productId,currentStatus){
  let newStatus=currentStatus==1?2:1,
      confirmTips=currentStatus==1?'确定要上架该商品？':'确定要下架该商品';
      if(window.confirm(confirmTips)){
      	_product.setProductStatus(productId,newStatus).then(
      		 (res)=>{_mm.successTip(res);
      		 	      this.loadProductList();},
      	     (errMsg)=>{_mm.errorTip(errMsg);}
        );
      }
    
  }
   //搜索按钮点击事件
  onSearch(searchType,searchKeyWord){
    let listType=(searchKeyWord===''?'list':'search');
    this.setState({
    	listType     :listType,
    	pageNum      :1,
    	searchType   :searchType,
    	searchKeyWord:searchKeyWord
    },()=>{
    	this.loadProductList();
    });
  }
  //页数发生变化的时候
  onPageChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
        this.loadProductList();
      });
  }
 
   render(){
   	let tableHead=[
            {name:'商品ID' ,width:'10%'},
            {name:'商品名称',width:'50%'},
            {name:'价格'   ,width:'20%'},
            {name:'状态'   ,width:'10%'},
            {name:'操作'   ,width:'10%'}
          ];
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="商品管理">
              	<div className="page-header-right">
              		<Link className="btn btn-primary" to="/product/save">
              			<i className="fa fa-plus"></i>
              			<span>添加商品</span>
              		</Link>
              	</div>
              </PageTitle>
                <ProductSearchComponent onSearch={(searchType,searchKeyWord)=>{this.onSearch(searchType,searchKeyWord)}}></ProductSearchComponent>
                <TableList tableHead={tableHead}>
                 { this.state.list.map((product,index)=>{
                   return (
                       <tr key={index}>
                         <td>{product.id}</td>
                         <td><span>{product.name}</span><p>{product.subtitle}</p></td>
                         <td>{product.price}</td>
                         <td>
                           <div>{product.status==1?<span className="product-status1">在售</span>:<span className="product-status2">已下架</span>}</div>
                           <button className="btn btn-warning btn-xs" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status==1?'下架':'上架'}</button>
                         </td>
                         <td><Link className="opear" to={ `/product/detail/${product.id}` }>查看</Link>
                             <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link></td>
                       </tr>
                    );
                   })
                }
                </TableList>
              <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>{this.onPageChange(pageNum)}}/>
           </div>
        </div>

   		)
   }
} 
export default ProductList;
