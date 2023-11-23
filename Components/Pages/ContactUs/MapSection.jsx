// import React from "react";
// import GoogleMapReact from 'google-map-react';
//
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
//
// export default function SimpleMap(){
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };
//
//     return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "AIzaSyCcIE4MU6ZTR_k3-9G9TYitUpx2dM3ur9Y" }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//             >
//                 <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                     text="My Marker"
//                 />
//             </GoogleMapReact>
//         </div>
//     );
// }


import React from 'react';
import {LoadScript, GoogleMap, Marker} from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '400px'
};


const MapSection = ({locations, center, zoom}) => {


    return (
        // <LoadScript
        //     googleMapsApiKey="AIzaSyCoVE9yQ3Y_48ThEQV7bYtdMxSXeBZ72AU"
        // >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                {locations.map((location, index) => (
                    <Marker title={location.name}

                            key={index}
                            position={location}
                    />
                ))}
            </GoogleMap>
        // </LoadScript>
    );
}
export default MapSection;