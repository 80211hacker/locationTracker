import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


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
)((props) =>(
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
));


export default MyMapComponent;
