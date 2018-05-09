/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React                   from 'react';
import PageTitle               from 'component/pageTitle/pageTitle.jsx'
import TableList               from 'util/generaldutyTable/table.jsx'
import Mutil                   from 'util/util.jsx'
import OrderService            from 'service/order_service.jsx'

import '../order.scss'
const _mm      =new Mutil();
const _order =new OrderService ();

class OrderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
        orderNo:this.props.match.params.orderNo || 0,
        orderDetail:{}
    }

  }
  componentDidMount(){
    this.loadOrderDetail();
  }
  loadOrderDetail(){
    _order.getOrderDetail(this.state.orderNo).then(
      (res)=>{
        this.setState({
          orderDetail:res
        });
      },
      (errMsg)=>{
        _mm.errorTip(errMsg);

      }
      );
  }
  onSendGoods(e){
   if(window.confirm('是否确认该订单已经发货？')){
            _order.sendOrderGoods(this.state.orderDetail.orderNo).then((res) => {
                _mm.successTips(res);
                this.loadOrderDetail();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
  }
  
  render(){
    let receiverInfo = this.state.orderDetail.shippingVo || {},
        orderItemVoListInfo=this.state.orderDetail.orderItemVoList || [];
    let tableHead=[{name:'商品图片',width:'10%'},{name:'商品信息',width:'60%'},{name:'单价',width:'10%'},{name:'数量',width:'10%'},{name:'总价',width:'10%'}];
    return (
          <div id="page-wrapper">
            <div className="row">
              <div className="col-md-12"> 
                  <PageTitle title='订单详情'/>
                  <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">订单号：</label>
                        <div className="col-md-5">
                         <p className="form-control-static">{this.state.orderDetail.orderNo}</p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">创建时间：</label>
                        <div className="col-md-5">
                          <p className="form-control-static">{this.state.orderDetail.createTime}</p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">收件人：</label>
                        <div className="col-md-5">
                          <p className="form-control-static">
                            {receiverInfo.receiverName}，
                           
                          </p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">收货地址：</label>
                        <div className="col-md-10">
                          <p className="form-control-static">
                            {receiverInfo.receiverProvince} 
                            {receiverInfo.receiverCity} 
                            {receiverInfo.receiverAddress} 
                          </p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">联系电话：</label>
                        <div className="col-md-5">
                          <p className="form-control-static">
                             {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                          </p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">订单状态：</label>
                        <div className="col-md-5">
                           <p className="form-control-static">{this.state.orderDetail.statusDesc}</p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">支付方式：</label>
                        <div className="col-md-5">
                          <p className="form-control-static">
                            {this.state.orderDetail.paymentTypeDesc}
                             {
                                    this.state.orderDetail.status === 20
                                    ? <button className="btn btn-default btn-sm btn-send-goods"
                                        onClick={(e) => {this.onSendGoods(e)}}>立即发货</button>
                                    : null
                                }
                            </p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">支付金额：</label>
                        <div className="col-md-5">
                           <p className="form-control-static">￥{this.state.orderDetail.payment}</p>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                           <TableList tableHead={tableHead}>
                             { orderItemVoListInfo.map((order,index)=>{
                             return (
                               <tr key={index}>
                                   <td><img className="order-product-img" src={`${this.state.orderDetail.imageHost}${order.productImage}`}/></td>
                                   <td>{order.productName}</td>
                                   <td>￥{order.currentUnitPrice}</td>
                                   <td>{order.quantity}</td>
                                   <td>￥{order.totalPrice}</td>
                               </tr>
                              );
                            })
                            }
                          </TableList> 
                        </div>
                      </div>
              </div>
              
          </div>
        </div>
      </div>
            

      );
  }
}

export default OrderDetail;