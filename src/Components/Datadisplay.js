import React, { Component } from 'react';
import Table from './Table';
import Filters from './Filters';
import { getBreachData } from '../Utils/api';
import Loader from 'react-loader-spinner';

const invertDirection = {
  asc: 'desc',
  desc: 'asc'
}

export default class Datadisplay extends Component {
  
  state = {
    data: null,
    error: null,
    loading: true,
    rows: [],
    displayedData : [],
    offsetData: null,
    columnToSort: '',
    sortDirection: 'desc',
    isVerified: false,
    isSensitive: false,
    isSpam: false
  }

  async componentDidMount() {
    const breachData = await getBreachData()

    if (breachData === null) {
      this.setState({
        error: 'Looks like there is an error, please try again',
        loading: false
      })
    }

    this.setState({
      data: breachData,
      loading: false
    })

    let rows = this.state.rows
    const currentData = this.state.data
    let id = 0
    currentData.forEach((item) => {
      id += 1
      rows.push({name: item.Name, count: item.PwnCount, isVerified: item.IsVerified, isSensitive:item.IsSensitive, isSpam:item.IsSpamList, id: id})
    })
   
    this.setState({
      rows: rows,
      displayedData: rows
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      // reset offset when filtering
      this.setState({offsetData: null})
      // find the intersection when filtering
      let selectedData = this.state.rows.filter((row) => this.state.isVerified ? row.isVerified : true )
                         .filter((row) => this.state.isSensitive ? row.isSensitive : true)
                         .filter((row) => this.state.isSpam ? row.isSpam : true)
      this.setState({displayedData: selectedData})
    })
  }

  sortData = (columnName, data, dataType) => {
    this.setState({
      columnToSort: columnName,
      sortDirection: 
        this.state.columnToSort === columnName 
          ? invertDirection[this.state.sortDirection] 
          : 'asc'
    })

    if (this.state.sortDirection === 'desc'){
      if (dataType === 'name'){
        data.sort((a,b) => {
          return a[dataType].localeCompare(b[dataType])
        })
      } else {
        data.sort((a,b) => {
          return a[dataType] -b[dataType]
        })
      }
    } else {
      if (dataType === 'name'){
        data.sort((a,b) => {
          return b[dataType].localeCompare(a[dataType])
        })
      } else {
        data.sort((a,b) => {
          return b[dataType] -a[dataType]
        })
      }
    }
  }

  handleClick = (offset) => {
    this.setState({offsetData: offset})
  }

  render() {
    if (this.state.error) {
      return(
        <p>{this.state.error}</p>
      )
    }

    if (this.state.loading === true) {
      return(
          <Loader 
              type="ThreeDots"
              color="#ffb300"
              height="100"	
              width="100"
          />  
      )
    }
    
    return (
      <div>
        <Filters 
          handleChange = {this.handleChange}
          isVerified = {this.state.isVerified}
          isSensitive = {this.state.isSensitive}
          isSpam = {this.state.isSpam}
        />
        <Table 
          displayedData = {this.state.displayedData} 
          handleSort={this.sortData}
          sortDirection = {this.state.sortDirection}
          columnToSort = {this.state.columnToSort}
          offsetData = {this.state.offsetData}
          handleClick = {this.handleClick}
        />
      </div>
    )
  }
}