import React from "react";
import { Button } from 'react-bootstrap'
import booleanData from '../data/booleanmeasures.txt'
import booleanSchema from '../schema/booleanmeasures.csv'
import fetch from 'isomorphic-fetch'

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      headerTitles: [],
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
    console.log(this.state.dataToSend)
  };
  render() {
    const { dataToSend, schema } = this.state;
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
      </>
    );
  }
}

export default DataTable
