/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter as Router,Route,Link,Switch} from 'react-router-dom'

class ComponentA extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
          <div>
           <Switch>
              //exact表示全部匹配
           	  <Route exact path={`${this.props.match.path}`}
           	         render={(route) => {
                      return  <div>当前组件是不带参数的A</div>
           	         }}/>
           	  
           	  <Route path={`${this.props.match.path}/sub`}
           	         render={(route) => {
           	         	return <div>当前组件是sub</div>
           	         }}/>
           	  {/*把通配的放在最后*/}
           	  <Route path={`${this.props.match.path}/:id`}
           	         render={(route) => {
           	         	return <div>当前组件是带参数的A，参数是:{route.match.params.id}</div>
           	         }}/>
           </Switch>
          </div>
		) 
	}
}
class ComponentB extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>ComponentBbbbbbbbbbb</div>
	}
}

class  Wrapper extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
           <div>
           <Link to="/a">组件A </Link>
           <br/>
            <Link to="/a/123">带/123参数的组件A</Link>
            <br/>
            <Link to="/a/sub">带/sub参数的组件A</Link>
            <br/>
           <Link to="/b">组件B </Link>
           	  {this.props.children}
           </div>
			)
	}
}
ReactDOM.render(
	<Router>
     	<Wrapper>
     	<Route path="/a" component={ComponentA}></Route>
     	<Route path="/b" component={ComponentB}></Route>
     	</Wrapper>
    </Router>,
     document.getElementById('app')

	)