import React      from 'react'
import {Link}     from 'react-router-dom'

class TableList extends React.Component{
  constructor(props){
    super(props);
     this.state={
         isFirstLoading:true
   }
  }
   ComponentWillReceiveProps(){
    //列表只有在第一次挂载的时候，isFirstLoadin才为true，否则为false
    this.setState({
        isFirstLoading:false
        });
   }
   render(){
    //表头信息
    let tableHeader=this.props.tableHead.map((tableHead,index)=>{
      if(typeof tableHead==='object'){
         return (
            <th key={index} width={tableHead.width}>{tableHead.name}</th>
          );
      }else if(typeof tableHead==='String'){
        return (
            <th key={index}>{tableHead}</th>
          );
      }
         
    });
    //tbody内容
    let tbodyList=this.props.children;
    //没有请求到数据时的显示或提示
    let errorBody=(
       <tr>
         <td className="text-center" colSpan={this.props.tableHead.length}>{this.state.isFirstLoading?'正在加载....':'没有找到相应的结果'}</td>
       </tr>
     );
    
    //表格主体内容区
   let tableBodyList= tbodyList.length>0?tbodyList:errorBody;
   	return (
          <div className="row">
            <div className="col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {tableHeader}
                    </tr>
                  </thead>
                  <tbody>
                      {tableBodyList}         
                  </tbody>
                </table>
            </div>
          </div>
   		)
   }
} 
export default TableList;
