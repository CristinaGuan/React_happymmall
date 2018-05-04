import React             from 'react'
import {Link}            from 'react-router-dom'
import PageTitle         from 'component/pageTitle/pageTitle.jsx'
import Pagination        from 'util/pagination/pagination.jsx';
import TableList         from 'util/generaldutyTable/table.jsx'
import Mutil             from 'util/util.jsx'
import Product           from 'service/product_server.jsx'

import './category.scss'

const _mm      = new Mutil();
const _product = new Product();

class CategoryList extends React.Component{
  constructor(props){
    super(props);
    this.state={
         parentCategoryList:[],
         parentCategoryId:0
   }
  }
  //componentDidMount()在组件被装配后立即调用
  componentDidMount(){
   this.loadCategoryList();
   console.log(this.state.parentCategoryList);
  }
  //请求商品列表数据
  loadCategoryList(){
  	//请求接口
    _product.getCategoryList(this.state.parentCategoryId).then((res)=>{
      console.log(res);
      this.setState({
            parentCategoryList:res
          });
      },(errMsg)=>{
         _mm.errorTip(errMsg);
    });
  }
 
  render(){
   	let tableHead=[{name:'品类ID',width:'10%'},{name:'品类名称',width:'60%'},{name:'操作',width:'30%'}];
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="品类管理">
              	<div className="page-header-right">
              		<Link className="btn btn-primary" to="/product/category-add">
              			<i className="fa fa-plus"></i>
              			<span>添加品类</span>
              		</Link>
              	</div>
              </PageTitle>
              <div className="row">
                    <div className="col-md-12">
                        <p>当前商品分类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHead={tableHead}>
                 { this.state.parentCategoryList.map((category,index)=>{
                   return (
                       <tr key={index}>
                         <td>{category.id}</td>
                         <td>{category.name}</td>
                         <td><Link className="opear" to="/">修改名称</Link><Link className="opear" to="/">查看其子品类</Link></td>
                       </tr>
                    );
                   })
                }
                </TableList>
           </div>
        </div>

   		)
   }
} 
export default CategoryList;
