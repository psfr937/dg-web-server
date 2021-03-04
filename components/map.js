import GoogleMapReact from "google-map-react";
import config from "../config";
import React from "react";

function MapMarker() {
  return <svg viewBox="0 0 24 24">
    <path
      d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
  </svg>
}

export default function Map({ center = {
  lat: 22.2776682,
  lng: 114.1558256 //22.2855325,114.1339776
}, zoom = 19}){
  return (
    <div style={{ height: '200px', width: '300px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleApiKey /* YOUR KEY HERE */ }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <MapMarker
          lat={center.lat}
          lng={center.lng}
          text="Your Location"
        />
      </GoogleMapReact>
    </div>
  )
}