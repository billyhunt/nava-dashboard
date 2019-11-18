import React from "react";
import { Button } from 'react-bootstrap'
import booleanData from '../data/booleanmeasures.txt'
import booleanSchema from '../schema/booleanmeasures.csv'
import fetch from 'isomorphic-fetch'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: '',
      statusColor: '',
      dataToSend: [],
      schema: []
    };
  }
  componentDidMount() {
    let schema = [];
    let dataToSend = [];
    let schemaTitles = [];
    fetch(booleanSchema)
      .then(response => response.text())
      .then(rawSchema => {
        const schemaFields = rawSchema.split('\n');
        schemaFields.forEach(row => {
          const fields = row.split(',');
          schema.push({
            name: fields[0],
            width: fields[1],
            dataType: fields[2]
          });
        });
        this.setState({
          schema
        })
      }).then(() => {
      fetch(booleanData)
        .then(response => response.text())
        .then(data => {
          const dataFields = data.split('\n');
          dataFields.forEach((row, index) => {
            const dataRow = {};
            schema.forEach((field) => {
              if (field.dataType === 'BOOLEAN') {
                dataRow[field.name] = (parseInt(row.slice(0, field.width)) === 1);
              } else if (field.dataType === 'INTEGER') {
                dataRow[field.name] = parseInt(row.slice(0, field.width));
              } else {
                //Defaults to type TEXT
                dataRow[field.name] = row.slice(0, field.width);
              }
              row = row.slice(field.width);
              if (index === 0) {
                schemaTitles.push(<th>{field.name}</th>)
              }
            });
            dataToSend.push(dataRow);
          });
          this.setState({
            dataToSend
          });
          this.setState({
            schemaTitles
          });
        });
    });
  }
  sendRequest = () => {
    fetch('http://localhost:8000', {
      method: 'post',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.dataToSend)
    }).then(res => {
      console.log(res);
      this.setState({
        statusMessage: (res.status === 201) ? 'Records Received' : 'Records were not sent.  Please try again.'
      });
      this.setState({
        statusColor: (res.status === 201) ? 'text-success' : 'text-danger'
      });
    });
  };

  render() {
    const { dataToSend, schema, statusMessage, statusColor } = this.state;
    return (
      <>
        <div>
          <h3>Request</h3>
          {JSON.stringify(dataToSend)}
        </div>
        <div>
          <h3>Schema</h3>
          {JSON.stringify(schema)}
        </div>
        <Button onClick={this.sendRequest} className='mt-5' variant="primary">Push To Send</Button>
        <h4 className={"mt-5 " + statusColor}>{statusMessage}</h4>
      </>
    );
  }
}

export default Main
