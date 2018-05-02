import React      from 'react'
import FileUpload from 'util/fileUpload/react-fileupload.jsx'

class FileUploader extends React.Component{
  render(){
	let options={
		baseUrl:'/manage/product/upload.do',
		fileFieldName:'upload_file',
		dataType:'json',
		uploadSuccess:(resp)=>{
			console.log(resp);
		},
		uploadError:(err)=>{}
	}
	return (
		<FileUpload options={options}>
			<button className="btn btn-xs btn-default" ref="chooseAndUpload">上传图片</button>
		</FileUpload>
	)	        
}
}

export default FileUploader;