import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Mapx from './Mapx.jsx'
import UserCords from './UserCords.jsx'

// import JobPostList from './JobPostList.jsx'

import { Polyline } from "react-google-maps";
import { DirectionsRenderer } from "react-google-maps";




const Mapper = compose(
  withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
    withScriptjs,
    withGoogleMap
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
    defaultCenter={props.centers}
    key={props.id}
  >

    {/*console.log(" @@@@@ THIS IS NODESPOLYS: ")*/}

    {/*console.log(props.nodesPolys)*/}



    {props.nodesPolys.map(nodePoly =>(
      <Polyline path={nodePoly} options={nodePoly.polyLineColor} key={nodePoly.idx}></Polyline>
  ))}

    {props.nodes.map(marker => (

        <div>
          <div>
            <Marker
              position={marker}
              onClick={props.onToggleOpen}
                  onDblClick={props.onDoubleClicks}
                  onMouseDown={props.onDoubleClicks}
              key={marker.idx}
              draggable={true}
              title={'Nodes'}

            />

          </div>
          <div>

            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen} position={marker}>
          <h4>{marker.lat} {marker.lng} <a href="http://intel.com"> links: </a></h4>
          </InfoWindow>}

          </div>


        </div>



          ))}

  </GoogleMap>

  </div>
  <div>
   {props.nodes.map(node => (
     <h3 key={node.idx}>
       id: {node.idx} &nbsp;&nbsp;  latitude: {node.lat}  &nbsp;&nbsp;   longitude: {node.lng}
   </h3>

   ))}
 </div>



</div>
));


export default Mapper;
