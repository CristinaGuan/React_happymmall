import React             from 'react'
import PageTitle         from 'component/pageTitle/pageTitle.jsx'
import {Link}            from 'react-router-dom'
import Pagination        from 'util/pagination/pagination.jsx';
import Mutil             from 'util/util.jsx'
import TableList         from 'util/generaldutyTable/table.jsx'
import Product           from 'service/product_server.jsx'
import ProductSearchComponent from 'page/product/productIndex/product_searchComponent.jsx'
import './pro_index.scss'

const _mm      = new Mutil();
const _product = new Product();

class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state={
         pageNum:1,
         list:[],
         status:1
   }
  }
  //在dom渲染完成后执行请求
  componentDidMount(){
   this.loadProductList();
  }
  //请求商品列表数据
  loadProductList(){
   _product.getProductListData(this.state.pageNum).then((res)=>{
      console.log(res);
      this.setState(res);
    },(errMsg)=>{
    	console.log(errMsg);
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
  //页数发生变化的时候
  onPageChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
        this.loadProductList();
      });
  }

   render(){
   	let tableHead=[{name:'商品ID',width:'10%'},{name:'商品名称',width:'50%'},{name:'价格',width:'20%'},{name:'状态',width:'10%'},{name:'操作',width:'10%'}];
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="商品管理"/>
                <ProductSearchComponent></ProductSearchComponent>
                <TableList tableHead={tableHead}>
                 { this.state.list.map((product,index)=>{
                   return (
                       <tr key={index}>
                         <td>{product.id}</td>
                         <td><span>{product.name}</span><p>{product.subtitle}</p></td>
                         <td>{product.price}</td>
                         <td>
                           <span>{product.status==1?'在售':'已下架'}</span>
                           <button className="btn btn-warning btn-xs" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status==1?'下架':'上架'}</button>
                         </td>
                         <td><Link className="opear" to="/product/detail/${product.id}">查看</Link><Link className="opear" to="/product/edit/${product.id}">编辑</Link></td>
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
