import React from 'react'
import pusher from '../../helpers/pusher'

class FileUploader extends React.PureComponent{

  constructor(props){
    super(props)
    this.fileUpload = this.fileUpload.bind(this)
  }

  componentDidMount() {
    this.setState({
      percentage: 0
    });
    const channel = pusher.subscribe('fileUploadProcess');
    channel.bind('message', data => {
      this.setState({ percentage: data });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  render(){
    return(
      <div>
        <button onClick={this.fileUpload}>Upload a file</button>
        <div>
          {this.state.percentage}% completed
        </div>
      </div>
    )
  }
}

export default FileUploader