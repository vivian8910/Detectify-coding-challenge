import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";

const themeNew = createMuiTheme({
  palette: {
    primary:{
      main: '#ffb300',
      light: '#fff8e1'
    },
    secondary:{
      main: '#e65100'
    }
  },
  typography: {
    useNextVariants: true,
  }
})

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: themeNew.palette.primary.main,
    color: themeNew.palette.common.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '85%',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto',
    overflowX: 'auto',
    marginBottom: theme.spacing.unit * 6,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: themeNew.palette.primary.light,
    },
  },
  toolbar: {
    color: themeNew.palette.primary.main
  }
});

class CustomizedTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes, handleSort, sortDirection, columnToSort, offsetData, handleClick, displayedData } = this.props
    const limit = 10
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell onClick = {() => handleSort('branch', displayedData, 'name')}>
                <div className = 'container'>
                  <span>Branch Name</span>
                  <div>{columnToSort === 'branch' ? (sortDirection === 'asc' ? <ExpandLess /> : <ExpandMore />) : null}</div>
                </div>
              </CustomTableCell>
              <CustomTableCell onClick = {() => handleSort('pwncount',  displayedData, 'count')}>
                <div className = 'container'>
                  <span>PwnCount</span>
                  <div>{columnToSort === 'pwncount' ? (sortDirection === 'asc' ? <ExpandLess/> : <ExpandMore  />) : null}</div>
                </div>
              </CustomTableCell>
              <CustomTableCell>Is Verified</CustomTableCell>
              <CustomTableCell>Is Sensitive</CustomTableCell>
              <CustomTableCell>Is SpamList</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.slice(offsetData, offsetData + limit).map(row => {
              return (
                <TableRow className = {classes.row} key = {row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell>{row.count}</CustomTableCell>
                  <CustomTableCell>{row.isVerified ? <Done /> : <Clear />}</CustomTableCell>
                  <CustomTableCell>{row.isSensitive ? <Done /> : <Clear />}</CustomTableCell>
                  <CustomTableCell>{row.isSpam ? <Done /> : <Clear />}</CustomTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <MuiThemeProvider theme={themeNew}>
          <CssBaseline />
          <Pagination
            limit = {limit}
            offset = {offsetData}
            total={displayedData.length}
            onClick={(e, offset) => handleClick(offset)}
          />
        </MuiThemeProvider>
      </Paper>
    )
  }
}

export default withStyles(styles)(CustomizedTable);