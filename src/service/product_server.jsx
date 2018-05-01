import Mutil from "../util/util.jsx";
const _mm = new Mutil();

class Product{
 //请求商品列表接口
  getProductListData(pageNum){
    return _mm.request({
      type:'post',
      url:'/manage/product/list.do',
      data:{pageNum:pageNum}
    });
  }

  //修改商品销售状态
  setProductStatus(productId,Status){
    return _mm.request({
      type:'post',
      url:'/manage/product/set_sale_status.do',
      data:{productId:productId,status:Status}
    });
  }
}
export default Product;