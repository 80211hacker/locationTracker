import React from "react"
import ReactDOM from 'react-dom'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Mapx from './components/Mapx.jsx'


const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBDIff4w_Iqkht_Zh988rKWhXVjdYmq7sQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `300px` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `350px`, width: `500px` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
<div>
  {console.log(props)}
    {console.log(props.namex)}

  <div>
    <Mapx naming={props.namex}/>
  </div>
  <div>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 19.4326077, lng: -99.133208 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 19.1326077, lng: -99.333208 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
  </div>

</div>
)

// class MyFancyComponent extends React.PureComponent {
class MyFancyComponent extends React.Component {




  constructor(props) {
   super(props);

   this.state = {
     isMarkerShown: true,
     name: 'John',
     age: 21,
     variablex: 0
   }

   this.clickListener = this.clickListener.bind(this);
   // thix = thix.bind(this)


 }

 clickListener(){

   // console.log(this.state.age)
   console.log(" click Listener: ")
   console.log(this.state.variablex)
   this.setState({variablex: 1});
   console.log(this.state.variablex)
   console.log("******************")

 }


  componentDidMount() {
    // this.delayedShowMarker()
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

  render() {
    return (

      <div>
      <div>
        <h2> My top component: </h2>
        <button onClick={this.clickListener}> clcik here</button>
          {console.log(this.state.name)}
          {console.log(" at main component: ")}
      </div>
      <div>
      <MyMapComponent
        namex={this.state.name}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}

      />

      </div>

      </div>
    )
  }
}


ReactDOM.render(<MyFancyComponent />, document.getElementById("root"));
