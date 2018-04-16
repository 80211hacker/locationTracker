import React from 'react';

class UserCords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'87456',
      latitude: '19.395888333333336',
      longitude: '-99.168715'
    }
    this.add = this.add.bind(this);
    this.updateId = this.updateId.bind(this);
    this.updateLatitude = this.updateLatitude.bind(this);
    this.updateLongitude = this.updateLongitude.bind(this);

  }

  updateId(e) {
    this.setState({
      id: e.target.value
    })
  }


  updateLatitude(e) {
    this.setState({
      latitude: e.target.value
    })
  }

  updateLongitude(e) {
    this.setState({
      longitude: e.target.value
    })
  }



  add() {
    this.props.addCords(this.state.id, this.state.latitude, this.state.longitude);
    // this.setState({
    //   description: '',
    //   quantity: ''
    // })
  }

  render () {
    return (<div>
      <div>
        <h3> This is an app with real time updates. <br />
          Nodes (cell phones) send http requests to the server with their latitude and longituted,
           and the server broadcast the coordinates to all subscribed clients (react map app).</h3>
         <h3>Go ahead, try it! Send some dummy data. Submit an id, Latitude and Longitude: </h3>
        <br />
      </div>
      <div>
      idxxy: <span> <input className="form-control" onChange={this.updateId} value={this.state.id}></input></span>
      <br />
      Latitude: <input onChange={this.updateLatitude} value={this.state.latitude}></input>
      <br />
      Longitude: <input onChange={this.updateLongitude} value={this.state.longitude}></input>
    <button className="send-cords" onClick={this.add}> Send cords </button>
      <br />
      <br />
      </div>
    </div>);
  }
}

export default UserCords;
