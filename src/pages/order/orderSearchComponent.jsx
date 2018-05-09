import React      from 'react'

class OrderSearchComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
       searchType:'orderNo', //按id搜索
       searchKeyWord:''  //订单号
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
  onSearch(){
    this.props.onSearch(this.state.searchType,this.state.searchKeyWord);
  }
  //输入关键字后按回车键，自动提交
  onSearchKeyWordKeyUp(e){
    if(e.keyCode===13){
      this.onSearch();
    }
  }
   render(){
   	return (
        <div className="row searchRow">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control" name="searchType" onChange={(e)=>this.onSearchValueChange(e)}>
                  <option value="productId">按订单号查询</option>
                </select>
              </div>
            <div className="form-group">
               <input type="text" className="form-control" placeholder="订单号" name="searchKeyWord" onChange={(e)=>this.onSearchValueChange(e)} onKeyUp={(e)=>{this.onSearchKeyWordKeyUp(e)}}/>
            </div>
               <button type="button" className="btn btn-primary" onClick={(e)=>this.onSearch(e)}>查询</button>
            </div>
          </div>
        </div>
   		)
   }
} 
export default OrderSearchComponent;
