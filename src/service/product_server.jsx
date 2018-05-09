import Mutil from "../util/util.jsx";
const _mm = new Mutil();

class Product{
  /*
    商品相关接口请求
   */
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

  //获取商品详情
  getProductDetail(productId){
   return _mm.request({
      type:'post',
      url:'/manage/product/detail.do',
      data:{
        productId:productId
      }
   });
  }
  //检查商品是否合法
  checkProductData(product){
    let result = {
            status: true,
            msg: '验证通过'
        };
    if(typeof product.name!=='string' || product.name.length===0){
      return {
        status:false,
        msg:'商品名称不能为空~'
      }
    }
    if(typeof product.subtitle!=='string' || product.subtitle.length===0){
      return {
        status:false,
        msg:'商品描述不能为空~'
      }
    }
    if(typeof product.categoryId!=='number' || !(product.categoryId>0)){
      return {
        status:false,
        msg:'您还没有选择商品品类~'
      }
    }
    // 判断商品价格为数字，且大于0
    if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
    if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
    return result;
  }

  //保存商品--添加商品
  saveProduct(productData){
   return _mm.request({
      url:'/manage/product/save.do',
      type:'post',
      data:productData
    });
  }
  /*
    品类相关接口请求
   */
  //请求分类列表接口
  getCategoryList(categoryId){
    return _mm.request({
      type:'post',
      url:'/manage/category/get_category.do',
      data:{categoryId:categoryId || 0}
    });
  }
  submitCategory(subData){
    return _mm.request({
      type:'post',
      url:'/manage/category/add_category.do',
      data:{
        parentId:subData.parentId || 0,
        categoryName:subData.categoryName
      }
    });
  }

}
export default Product;