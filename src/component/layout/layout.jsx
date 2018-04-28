import React from 'react'
import 'component/layout/theme.css'
import TopNav from 'component/top-nav/top-nav.jsx'
import SideNav  from 'component/side-nav/side-nav.jsx'

class Layout extends React.Component{
	constructor(props){
		super(props);
	}
  render(){
  	return (

         <div id="wrapper">
         	 <TopNav/>
         	<SideNav/>
           	{this.props.children}
         </div>
  		)
  }
}

export default Layout;