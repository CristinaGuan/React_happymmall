import React      from 'react'

class ProductSearchComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
       searchType:'',//productid or productname 
       searchKeyWord:'' //搜索关键字
    }
  }
  //下拉菜单数据、输入框数据变化额时候
  onSearchValueChange(e){
    let name=e.target.name,
        value=e.target.value.trim();
    this.setState({
        [name]:value
    });

  }
  //搜索按钮的点击事件
  onsearch(){

  }
   render(){
   	return (
        <div className="row searchRow">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control" name="searchType" onChange={(e)=>this.onSearchValueChange(e)}>
                  <option value="productId">按商品ID查询</option>
                  <option value="productName">按商品名称查询</option>
                </select>
              </div>
            <div className="form-group">
               <input type="text" className="form-control" placeholder="关键字" name="searchKeyWord" onChange={(e)=>this.onSearchValueChange(e)}/>
            </div>
               <button type="button" className="btn btn-primary" onClick={(e)=>this.onSearch(e)}>查询</button>
            </div>
          </div>
        </div>
   		)
   }
} 
export default ProductSearchComponent;
