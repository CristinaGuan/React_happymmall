import React      from 'react'
import PageTitle  from 'component/pageTitle/pageTitle.jsx'
import {Link}     from 'react-router-dom'
import Pagination from 'util/pagination/pagination.jsx';
import Mutil      from 'util/util.jsx'
import User       from 'service/user_service.jsx'
import TableList  from 'util/generaldutyTable/table.jsx'

const _mm   = new Mutil();
const _user = new User();

class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state={
         pageNum:1,
         list:[]
   }
  }
  //请求接口
  componentDidMount(){
   this.loadUserList();
  }
  loadUserList(){
    _user.getUserList(this.state.pageNum).then((res)=>{
      // console.log(res);
        this.setState(res);
    },(errMsg)=>{
          this.setState({
            list:[]
          });
         _mm.errorTip(errMsg);
    });
  }
  //页数发生变化的时候
  onPageChange(pageNum){
    this.setState({
      pageNum:pageNum
    },()=>{
        this.loadUserList();
      });
  }
   render(){
   	return (
       <div>
       	   <div id="page-wrapper">
              <PageTitle title="用户列表"/>
                <TableList tableHead={['用户ID','用户名','邮箱','联系电话','注册时间']}>
                { this.state.list.map((user,index)=>{
                   return (
                       <tr key={index}>
                         <td>{user.id}</td>
                         <td>{user.username}</td>
                         <td>{user.email}</td>
                         <td>{user.phone}</td>
                         <td>{new Date(user.createTime).toLocaleString()}</td>
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
export default UserList;
