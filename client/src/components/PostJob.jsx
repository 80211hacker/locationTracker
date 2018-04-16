import React from 'react';

class PostJob extends React.Component {
  constructor(props){
    super(props);


    this.state = {
      jobName:'Garimaz',
      jobDescription:'',
      jobImage:''
    }

    this.add = this.add.bind(this);
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

    console.log(" adding: ")
    console.log(this.state.jobName)
    // this.props.addItem(this.state.jobName, this.state.jobDescription, this.state.jobImage);
    this.props.addItem();

    this.setState({
      jobName:'',
      jobDescription:'',
      jobImage:'',
    })
  }
  render(){
    return(

      <div>
      Job Title: <input  type="text" onChange={this.updateName} value={this.state.jobName}></input>

      Image url: <input type="url" onChange={this.updateImage}  value={this.state.jobImage}></input>

    Job Description <input type="text"  onChange={this.updateDescription} value={this.state.jobDescription}></input>
      <button onClick={this.add}>Post a Job</button>
    </div>);
  }
}

export default PostJob;
