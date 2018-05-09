/*
simditor的使用
安装:yarn add simditor
引入simditor.scss
 */
import React      from 'react'
import Simditor   from  'simditor';
import 'simditor/styles/simditor.scss';
import './richEdit.scss'

//这是一个通用的富文本编辑器组件
class RichEditor extends React.Component{
  constructor(props){
  	super(props);
  }
  componentDidMount(){
  	this.loadEditor();
  }
   componentWillReceiveProps(nextProps){
    if(this.props.defaultDetail !== nextProps.defaultDetail){
        this.simditor.setValue(nextProps.defaultDetail);
       }
    }
  loadEditor(){
  	let element   = this.refs['textarea'];
  	this.simditor = new Simditor({
        textarea:$(element),
        defauleValue:this.props.placeholder || '请输入内容',
        defaultImage:'',
        upload:{
    	   url:'/manage/product/richtext_img_upload.do',
    	   fileKey:'upload_file',
    	   connectionCount: 3,
           leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
		   

        }
  	});
  	this.bindEditorEvent();
  }
  //初始化富文本编辑器的事件
  bindEditorEvent(){
  	this.simditor.on('valuechanged',(e)=>{
  	this.props.onValueChange(this.simditor.getValue());  //getValue()是simditor定义的方法，可查看官方文档
  	})
  }
  render(){
  	return (
  		<div className="rich-editor">
  	      <textarea  ref="textarea" ></textarea>	
  		</div>
  	);
  }
}

export default RichEditor;