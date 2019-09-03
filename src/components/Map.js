import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    zoom: 12,
    width: '82vw',
    height: '75vh'
  });

  return (
    <div className='container'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
        mapStyle='mapbox://styles/ayushsnha/ck02aakn62yt41dmrjporr40q'
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {props.data
          .slice(0, 4000)
          .filter(loc => loc.from_lat !== 'NULL' && loc.from_long !== 'NULL')
          .map(startLoc => (
            <Marker
              key={startLoc.id}
              latitude={parseFloat(startLoc.from_lat)}
              longitude={parseFloat(startLoc.from_long)}
            >
              <i className='fa fa-taxi' />
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
}
