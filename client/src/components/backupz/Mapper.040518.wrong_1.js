import React from 'react';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Mapx from './Mapx.jsx'
import UserCords from './UserCords.jsx'

// import JobPostList from './JobPostList.jsx'

import { Polyline } from "react-google-maps";
import { DirectionsRenderer } from "react-google-maps";
// const { lifecycle } = require("recompose");





// const Mapper = compose(

class Mapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      quantity: ''
    }

    compose(

      withStateHandlers(() => ({
          isOpen: false,
        }), {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
          })
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
        componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();
          var  latitest = 19.385888333333336;
          var longtest = -99.168715;

          // console.log(DirectionsService);

          DirectionsService.route({

            origin: new google.maps.LatLng(`${latitest}`, longtest),
            destination: new google.maps.LatLng(19.415888333333336, -99.268715),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              // console.log(google.maps)
              this.setState({
                directions: result,
                statux: status
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });

          const DirectionsRenderer = new google.maps.DirectionsRenderer();
          console.log(DirectionsRenderer);
          var direcx = DirectionsRenderer.getDirections();
          DirectionsRenderer.setMap();
          console.log("&&&&&&&")
          console.log(direcx);

        }
      })



    )

  }


  render () {
      return (

        const Mapper = compose(

          withStateHandlers(() => ({
              isOpen: false,
            }), {
              onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen,
              })
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
            componentDidMount() {
              const DirectionsService = new google.maps.DirectionsService();
              var  latitest = 19.385888333333336;
              var longtest = -99.168715;

              // console.log(DirectionsService);

              DirectionsService.route({

                origin: new google.maps.LatLng(`${latitest}`, longtest),
                destination: new google.maps.LatLng(19.415888333333336, -99.268715),
                travelMode: google.maps.TravelMode.DRIVING,
              }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  // console.log(google.maps)
                  this.setState({
                    directions: result,
                    statux: status
                  });
                } else {
                  console.error(`error fetching directions ${result}`);
                }
              });

              const DirectionsRenderer = new google.maps.DirectionsRenderer();
              console.log(DirectionsRenderer);
              var direcx = DirectionsRenderer.getDirections();
              DirectionsRenderer.setMap();
              console.log("&&&&&&&")
              console.log(direcx);

            }
          })



        )

((props) =>(
<div>
    {/*console.log(props)*/}

  <div>
    <div>
      <h2> Current active nodes:</h2>

    </div>
  </div>

  <div>

  <GoogleMap
    defaultZoom={16}
    defaultCenter={this.props.centers}

  >

    {/*console.log(" @@@@@ THIS IS NODESPOLYS: ")*/}

    {/*console.log(props.nodesPolys)*/}



    {this.props.nodesPolys.map(nodePoly =>(
      <Polyline path={nodePoly} options={nodePoly.polyLineColor} key={nodePoly.idx}></Polyline>
  ))}

    {this.props.nodes.map(marker => (

        <div>
          <div>
            <Marker
              position={marker}
              onClick={this.props.onToggleOpen}
                  onDblClick={this.props.onDoubleClicks}
                  onMouseDown={this.props.onDoubleClicks}
              key={marker.idx}
              draggable={true}
              title={'Nodes'}

            />

          </div>
          <div>

            {this.props.isOpen && <InfoWindow onCloseClick={this.props.onToggleOpen} position={marker}>
          <h4>{marker.lat} {marker.lng} <a href="http://intel.com"> links: </a></h4>
          </InfoWindow>}

          </div>


        </div>



          ))}

          <DirectionsRenderer directions={this.props.directions} ></DirectionsRenderer>
  </GoogleMap>

  </div>
  <div>
   {this.props.nodes.map(node => (
     <h3 key={node.idx}>
       id: {node.idx} &nbsp;&nbsp;  latitude: {node.lat}  &nbsp;&nbsp;   longitude: {node.lng}
   </h3>

   ))}
 </div>



</div>))
}
}

export default Mapper;
