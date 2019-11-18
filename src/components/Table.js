import React, { Component } from 'react'

const TableRow = ({ row, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => {
        if (typeof row[column] === 'boolean') {
          row[column] = row[column] ? 'true' : 'false'
        }
        return <td key={index}>{row[column]}</td>
      })}
    </tr>
  )
}

export class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.props.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, index) => (
            <TableRow row={row} columns={this.props.columns} key={index} />
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
