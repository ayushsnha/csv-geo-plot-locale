import React from 'react';
import './CSS/Table.css';
export default function Table(props) {
  // console.log(props);
  let renderTds = data => {
    // console.log(data);
    return (
      <React.Fragment key={data.id}>
        <tr>
          <td>{data.from_lat}</td>
          <td>{data.from_long}</td>
          <td>{data.to_lat}</td>
          <td>{data.to_long}</td>
        </tr>
      </React.Fragment>
    );
  };
  return (
    <div className='container'>
      <table className='table table-bordered table-responsive'>
        <thead className='fixedHeader'>
          <tr>
            <th>From Lat</th>
            <th>From Long</th>
            <th>To Lat</th>
            <th>To Long</th>
          </tr>
        </thead>
        <tbody>{props.data.slice(0, 20).map(renderTds)}</tbody>
      </table>
      <p>Sample Latitudes and Longitudes from the CSV</p>
    </div>
  );
}
