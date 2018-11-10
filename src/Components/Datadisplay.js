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
    listDataFromChild: null,
    columnToSort: '',
    sortDirection: 'desc'
  }

  async componentDidMount() {
    const breachData = await getBreachData()
    // console.log(breachData)

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
      rows: rows
    })
  }

  getDataFromChild = (dataFromChild) => {
    this.setState({
      listDataFromChild: dataFromChild
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


  render() {
    // console.log(this.state.columnToSort, this.state.sortDirection)
    // console.log(this.state.listDataFromChild)
    if (this.state.error) {
      return(
        <p>{this.state.error}</p>
      )
    }

    if (this.state.loading === true) {
      return(
        <div>
          <Loader 
              type="ThreeDots"
              color="#ffb300"
              height="100"	
              width="100"
            />  
        </div>
      )
    }
    
    return (
      <div>
        <Filters 
          rows = {this.state.rows} 
          callbackFromParent = {this.getDataFromChild}
        />
        <Table 
          rows = {this.state.rows} 
          selectedData = {this.state.listDataFromChild} 
          handleSort={this.sortData}
          sortDirection = {this.state.sortDirection}
          columnToSort = {this.state.columnToSort}
        />
      </div>
    )
  }
}