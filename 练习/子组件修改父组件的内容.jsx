/*
* @Author: guanxy
* @Date:   2018-04-14 21:53:27
* @Last Modified by:   guanxy
* @Last Modified time: 2018-04-14 22:59:09
*/
import React from 'react'
import ReactDOM from 'react-dom'
//子组件修改父组件的内容
class Children1 extends React.Component{
	constructor(props){
		super(props);
	   this.state={
	   	bgColor1:'yellow'
	   }
	}
    handleClick(){
    	this.props.changeChild2bgColor('red')
    }
	render(){
		return (
          <div>
            <div style={{backgroundColor:this.state.bgColor1,width:'300px',height:'30px'}}>child1现在的背景色是:{this.state.bgColor1}</div>
            <button onClick={(e)=>{this.handleClick(e)}}>改变child2的背景色</button>
          </div>
	    )
	}
}
class Children2 extends React.Component{
	constructor(props){
		super(props);
		this.state={
	   	
	   }
	}
	render(){
		return (
          <div>
            <div style={{backgroundColor:this.props.bgColor2,width:'300px',height:'30px'}}>child2现在的背景色是:{this.props.bgColor2}</div>
          </div>
	    )
	}
}
class Father extends React.Component{
	constructor(props){
      super(props);
      this.state={
      	child2BgColor:'#999'
      }
     
	}
	onChild1BgColorChange(color){
       this.setState({
       	child1BgColor:color
       })
	}
	onChild2BgColorChange(color){
        this.setState({
        	child2BgColor:color
        })
	}
	render(props){
		return(
           <div>
           	<Children1 changeChild2bgColor={(color)=>{this.onChild2BgColorChange(color)}}/>
           	<Children2 bgColor2={this.state.child2BgColor}/>
           </div>
			) 
	}
}

ReactDOM.render(
	<Father/>,
  document.getElementById('app')
);