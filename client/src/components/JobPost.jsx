import React from 'react';

class PostJob extends React.Component {
  constructor(props){
    super(props);
    this.state={
      jobName='',
      jobDescription='',
      jobImage=''
    }
  }
  updateName(e){
    this.setState({
      jobName: e.target.value
    })
  }
  updateDescription(e){
    this.setState({
      jobDescription: e.target.value
    })
  }
  updateImage(e){
    this.setState({
      jobImage: e.target.value
    })
  }

  add(){
    this.props.addItem(this.state.jobName, this.state.jobDescription, this.state.jobImage);
    this.setState({
      jobName:'',
      jobDescription:'',
      jobImage:'',
    })
  }
  render(){
    return(<div>
      Job Title: <input type="text" onChange={this.updateName} value={this.state.jobName}></input>
      Image url: <input type="url" onChange={this.updateImage}  value={this.state.jobImage}></input>
      Job Description <input type="text" style="font-size: 12pt; height: 70px; width:380px;" onChange={this.updateDescription} value={this.state.jobDescription}></input>
      <button onClick={this.add}>Post a Job</button>
    </div>);
  }
}

export default PostJob;
