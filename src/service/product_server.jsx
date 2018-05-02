import Mutil from "../util/util.jsx";
const _mm = new Mutil();

class Product{
 //请求商品列表接口
  getProductListData(listParam){

    let url='',
        data={};
    if(listParam.listType==='list'){
      url='/manage/product/list.do';
      data={pageNum:listParam.pageNum};
    }else if(listParam.listType==='search'){
      url='/manage/product/search.do';
      data[listParam.searchType]=listParam.keyWord;
      data.pageNum=listParam.pageNum;
    }
   return _mm.request({
      type:'post',
      url:url,
      data:data
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
  
  //请求分类列表接口
  getCategoryList(categoryId){
    return _mm.request({
      type:'post',
      url:'/manage/category/get_category.do',
      data:{categoryId:categoryId || 0}
    });
  }

}
export default Product;