import React from 'react'

import TopNav from 'component/top-nav/top-nav.jsx'
import SideNav  from 'component/side-nav/side-nav.jsx'

import './theme.css'
import './index.scss'


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