import React             from 'react'
import {Link}            from 'react-router-dom'

import PageTitle         from 'component/pageTitle/pageTitle.jsx'
import Pagination        from 'util/pagination/pagination.jsx';
import Mutil             from 'util/util.jsx'
import TableList         from 'util/generaldutyTable/table.jsx'
import OrderService      from 'service/order_service.jsx'
import OrderSearchComponent from 'page/order/orderSearchComponent.jsx'


const _mm      = new Mutil();
const _order   =new OrderService();

class OrderList extends React.Component{
  constructor(props){
    super(props);
    this.state={
         pageNum:1,
         list:[],
         status:1,
         listType:'list'
   }
  }
  //componentDidMount()在组件被装配后立即调用
  componentDidMount(){
   this.loadOrderList();
  }
  //请求订单列表数据
  loadOrderList(){
  	let listParam={};
  	listParam.listType=this.state.listType;
  	listParam.pageNum=this.state.pageNum;
  	//如果是搜索的话，需要传入搜索类型和关键字
  	if(this.state.listType==='search'){
  	  listParam.searchType=this.state.searchType;
  	  listParam.searchKeyWord=this.state.searchKeyWord;
  	}
  	//请求接口
    _order.getOrderListData(listParam).then((res)=>{
      this.setState(res);
      },(errMsg)=>{
          this.setState({
            list:[]
          });
         _mm.errorTip(errMsg);
    });
  }
 
   //搜索按钮点击事件
  onSearch(searchType,searchKeyWord){

    let listType=(searchKeyWord===''?'list':'search');
    this.setState({
    	listType:listType,
    	pageNum:1,
    	searchType:searchType,
    	searchKeyWord:searchKeyWord
    },()=>{
    	this.loadOrderList();
    });
  }
  //页数发生变化的时候
  onPageChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
        this.loadOrderList();
      });
  }
 
   render(){
   	let tableHead=[{name:'订单号',width:'20%'},{name:'收件人',width:'20%'},{name:'订单状态',width:'10%'},{name:'订单总价',width:'20%'},{name:'创建时间',width:'20%'},{name:'操作',width:'10%'}];
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="订单管理">
              </PageTitle>
                <OrderSearchComponent onSearch={(searchType,searchKeyWord)=>{this.onSearch(searchType,searchKeyWord)}}></OrderSearchComponent>
                <TableList tableHead={tableHead}>
                 { this.state.list.map((order,index)=>{
                   return (
                       <tr key={index}>
                         <td>{order.orderNo}</td>
                         <td>{order.receiverName}</td>
                         <td>{order.statusDesc}</td>
                         <td>￥{order.payment}</td>
                         <td>{order.createTime}</td>
                         <td><Link to={ `/order/detail/${order.orderNo}`}>查看</Link></td>
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
export default OrderList;
