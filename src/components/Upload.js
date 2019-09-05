import React from 'react';
import Papa from 'papaparse';
import './CSS/Upload.css';
import Table from './Table';
import Map1 from './Map1';
import Graphs from './Graphs';
import Graph1 from './Graph1';
class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: null,
      data: null
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData(result) {
    this.setState({ data: result.data });
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className='container c1 shadow p-3 mb-5 bg-white rounded rounded-pill'>
          <h4>Upload CSV File!</h4>
          <div className='box'>
            <input
              type='file'
              ref={input => {
                this.filesInput = input;
              }}
              name='file'
              placeholder={null}
              onChange={this.handleChange}
            />
            <p />
            <button
              className='btn btn-success'
              disabled={!this.state.csvfile}
              onClick={this.importCSV}
            >
              Upload now!
            </button>
            {this.state.data && this.state.csvfile ? (
              <p className='success'>File Upload Success</p>
            ) : (
              <p />
            )}
          </div>
        </div>
        {this.state.data ? (
          <React.Fragment>
            <Table data={this.state.data.slice(0, 20)} />
            <Map1 data={this.state.data} />
            <Graphs data={this.state.data} />
            <Graph1 data={this.state.data} />
          </React.Fragment>
        ) : (
          <p />
        )}
      </React.Fragment>
    );
  }
}

export default Upload;
