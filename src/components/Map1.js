import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map(props) {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_TOKEN
  });

  console.log(props.data);
  const markers = props.data.map(startLoc => (
    <Feature
      key={startLoc.id}
      coordinates={[
        parseFloat(startLoc.from_long),
        parseFloat(startLoc.from_lat)
      ]}
    />
  ));
  const mapStyle = {
    style: 'mapbox://styles/ayushsnha/ck02aakn62yt41dmrjporr40q'
  };

  return (
    <div className='container'>
      <Map
        center={[77.5946, 12.9716]}
        zoom={[11]}
        style={mapStyle.style}
        containerStyle={{
          width: '82vw',
          height: '75vh'
        }}
      >
        <Layer
          type='circle'
          id='marker'
          paint={{
            'circle-color': 'blue',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
            'circle-stroke-opacity': 1
          }}
        >
          {markers}
        </Layer>
      </Map>
    </div>
  );
}
