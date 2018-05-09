import Mutil from "../util/util.jsx";
const _mm = new Mutil();

class OrderService{
    /*
    订单相关接口请求
   */
 //请求订单列表接口
 getOrderListData(listParam){

      let url='',
          data={};
    if(listParam.listType==='list'){
      url='/manage/order/list.do';
      data={pageNum:listParam.pageNum};
    }else if(listParam.listType==='search'){
      url='/manage/order/search.do';
      data[listParam.searchType]=listParam.searchKeyWord;
      data.pageNum=listParam.pageNum;
    }
   return _mm.request({
      type:'post',
      url:url,
      data:data
    });
 }
 //请求订单详情数据
 getOrderDetail(orderNo){
  return _mm.request({
     type:'post',
      url:'/manage/order/detail.do',
      data:{
        orderNo:orderNo
      }

  });
 }
 //发货
 sendOrderGoods(orderNo){
  return _mm.request({
     type:'post',
      url:'/manage/order/send_goods.do',
      data:{
        orderNo:orderNo
      }

  });
 }

}
export default OrderService;