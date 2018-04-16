import React from "react"
import ReactDOM from 'react-dom'
import { compose, withProps } from "recompose"
import $ from 'jquery';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import Mapx from './components/Mapx.jsx'
// import MyMapComponent from './components/MyMapComponent.jsx'
import Mapper from './components/Mapper.jsx'

import JobPostList from './components/JobPostList.jsx'
import PostJob  from './components/PostJob.jsx'

import io from "socket.io-client";









// class MyFancyComponent extends React.PureComponent {
class MyFancyComponent extends React.Component {




  constructor(props) {
   super(props);

   this.state = {
     isMarkerShown: true,
     name: 'John',
     age: 21,
     variablex: 0,
     destinatiox: '',
     destination: '',
     messages: ['a', 'b','C'],
     latests: '',
     textSample: '',
     polyLineColorx: {strokeColor: '#33cc33',strokeWeight: 2},
     markerx: [{ "idx": "864223020078179", "latitude": "19.39799833333333", "longitude": "-99.17168666666666" }],
     customers: [{lat: 19.392143333333336, lng: -99.177515},{lat: 19.392103333333336, lng: -99.170115, alt: 1342}],
     centers: {lat: 19.396803355, lng: -99.17253111},
     bannerCords: '',
     nodes: [{lat: 19.392143333333336, lng: -99.177515},{lat: 19.392103333333336, lng: -99.170115, alt: 1342}],
     nodesPolys: [{polyLineColor: {strokeColor: '#FF0000',strokeWeight: 3}}],
     statusWebsocket: 'disconnected: '
   }

   this.clickListener = this.clickListener.bind(this);
   // thix = thix.bind(this)
   // this.socket = io('localhost:3000');
   this.socket = io('http://13.57.247.121:3000');

   var socket = io.connect();
console.log('check 1', socket.connected);
socket.on('connect', function() {
  console.log('check 2', socket.connected);
});

   const addStatux = data => {
     this.setState({statusWebsocket: 'WebSocket on: '});
   };

   if(socket.connected){
     addStatux();
     // this.setState({statusWebsocket: 'WebSocket on: '});

     console.log(" ??? SOCKET STABLISHED: ")
     console.log(this.state.statusWebsocket)
   }


   this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
  });

  this.socket.on('RECEIVE_CORDS', function(data){
     addMarker(data);
     var socket = io.connect();

     console.log('check 2', socket.connected);

 });

 this.socket.on('RECEIVE_PATHS', function(data){
    addPath(data);
});



const addPath = data => {


  // this.setState({customers: nexArrx});
  // this.setState({destinatiox: data, nodesPolys: data});
  this.setState({nodesPolys: data});



};

 const addMarker = data => {

   // console.log("###################");
   // console.log(" MARKER RECEIVED: ");
   // console.log(data);

   // var nexObjx = {};
   // var nexArrx = [];
   // nexObjx.lat = parseFloat(data.latitude);
   // nexObjx.lng = parseFloat(data.longitude);
   // nexArrx.push(nexObjx);
   // console.log(nexObjx);

   // nexArrx.push(data);
   // console.log("^^^^^^^^^^^^^^^");
   // console.log(data);

   // this.setState({customers: nexArrx});
   // this.setState({customers: data, nodes: data});
   this.setState({nodes: data});



 };

  const addMessage = data => {

    // console.log(data);
    // console.log(data.idx);

    var nexObj = {};
    var nexArr = [];
    nexObj.lat = parseFloat(data.latitude);
    nexObj.lng = parseFloat(data.longitude);
    nexArr.push(nexObj);
    console.log(nexObj);

    this.setState({messages: [...this.state.messages, data.idx],
      // this.setState({messages: data,
    // latests: data.latitude, customers: [...this.state.customers, nexObj]});
    latests: data.latitude, customers: nexArr, centers: nexObj, bannerCords: nexObj}
    );


    // this.setState({latests: datax.latitude})
    // console.log(this.state.messages);
  };



 }


 webSocketStatux(){
   this.setState({statusWebsocket: 'WebSocket on: '});
 }

 clickListener(){

   // console.log(this.state.age)
   console.log(" click Listener: ")
   console.log(this.state.variablex)
   this.setState({variablex: 1});
   console.log(this.state.variablex)
   // console.log("******************")

 }

clickButton(){
  this.trigerPath();
  // this.setState({textSample: this.state.latests})
  console.log("****************************");

}


  componentDidMount() {


    var socket = io.connect();
 console.log('check 1', socket.connected);
 socket.on('connect', function() {
   console.log('check 2', socket.connected);
 });
    // this.delayedShowMarker()
    // this.getGroceries();
    // this.getCords();
    // this.setState({
    //   destinatiox: [{ lat: 19.3226077, lng: -99.013208 }, { lat: 18.9526077, lng: -99.813208 }, { lat: 19.7526077, lng: -98.833208 }, { lat: 19.1526077, lng: -99.213208 }]
    //
    // })
  }

  delayedShowMarker(){
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 500)
  }


  handleMarkerClick(){
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  addItem(){

    console.log(" this is addItem: ")
  }

  getCords() {
      $.ajax({
        url: 'http://13.57.247.121:4101/justcords',
        method: 'GET',
        success: (results) => {
          // console.log(results);
          this.setState({destinatiox: results});
        },
        error: (xhr, err) => {
          console.log('err', err);
        }
      })
    }

    trigerPath() {
        $.ajax({
          url: 'http://13.57.247.121:4101/getint',
          method: 'GET',
          success: (results) => {
            console.log(results);

          },
          error: (xhr, err) => {
            console.log('err', err);
          }
        })
      }


  render() {
    return (

      <div>
      <div>
        <h2> My top componentvv: </h2>
        <h1>{this.state.textSample}</h1>
        {console.log("&&&&&&&&&&&&&&")}
        {/*console.log(this.state.latests)*/}
        <h2>{this.state.latests}</h2>
        <button onClick={this.clickButton.bind(this)} className="btn btn-primary form-control">Tracer</button>
        <button onClick={this.clickListener}> clcik here</button>
        <button onClick={this.clickButton.bind(this)} className="btn btn-primary form-control"> Real Time </button>

      </div>
      <div>
        <JobPostList jobs={[{jobName:"Mentor", jobDescription:"HIR at Holacode"},{jobName:"Mentors", jobDescription:"HIR at Holacodes"}]} />
      </div>
      <div>

      </div>
      <div>


    <Mapper
      googleMapURL=
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPQGiVkiUbRHwn_-1QJsb2N6icwce-Ioo&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `300px` }} />}
      containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `850px`, width: `1000px` }} />}

      namex={this.state.name}
      dest={this.state.destinatiox}
      polyLineColor={this.state.polyLineColorx}
      isMarkerShown={this.state.isMarkerShown}
      onMarkerClick={this.handleMarkerClick}
      customers={this.state.customers}
        messagex={this.state.messages}
        markers={this.state.markerx}
        centers={this.state.centers}
        bannerCords={this.state.bannerCords}
        nodes={this.state.nodes}
        nodesPolys={this.state.nodesPolys}

    />
      </div>

      </div>
    )
  }
}


ReactDOM.render(<MyFancyComponent />, document.getElementById("root"));
