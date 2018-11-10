import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';

const themeNew = createMuiTheme({
  palette: {
    primary:{
      main: '#ffb300',
      light: '#ffcc80'
    }
  },
  typography: {
    useNextVariants: true,
  }
})

const styles = {
  root: {
    color: themeNew.palette.primary.light,
    '&$checked': {
      color: themeNew.palette.primary.main,
    },
  },
  checked: {},
};

class Filters extends Component {
  
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    isVerified: false,
    isSensitive: false,
    isSpam: false,
    displayedData : []
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevState.displayedData !== this.state.displayedData){
      this.props.callbackFromParent(this.state.displayedData)
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
    const names = ['isVerified', 'isSensitive', 'isSpam']
    const otherNames =  names.filter((item) => item !== name)
    if (event.target.checked === true){
      let selectedData = this.props.rows.filter((item) => item[name] === true)
      let dataList = []
      otherNames.forEach((item) => {
        if (this.state[item] === true){
           let itemData = this.props.rows.filter((el) => el[item] === true)
           let intersection = selectedData.filter(x => itemData.includes(x))
           dataList.push(intersection)
        }
      })
      if (dataList.length === 0) {
        this.setState({displayedData: selectedData})
      }
      if (dataList.length === 1) {
        this.setState({displayedData: dataList[0]})
      }
      if (dataList.length === 2) {
        let intersectData = dataList[0].filter(x => dataList[1].includes(x))
        this.setState({displayedData: intersectData})
      }
    } else {
      let dataListNew = []
      otherNames.forEach((item) => {
        if (this.state[item] === true){
          let itemData = this.props.rows.filter((el) => el[item] === true)
          dataListNew.push(itemData)
        }
      })
      if (dataListNew.length === 0){
        this.setState({displayedData: this.props.rows})
      }
      if (dataListNew.length === 1){
        this.setState({displayedData: dataListNew[0]})
      }
      if (dataListNew.length === 2){
        let intersectData = dataListNew[0].filter(x => dataListNew[1].includes(x))
        this.setState({displayedData: intersectData})
      }
    }
  }

  render() {
    const { classes} = this.props;
    return (
      <div>     
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.isVerified}
              onChange={this.handleChange('isVerified')}
              value="isVerified"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label="Verified"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.isSensitive}
              onChange={this.handleChange('isSensitive')}
              value="isSensitive"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label="Sensitive"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.isSpam}
              onChange={this.handleChange('isSpam')}
              value="isSpam"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label="Spam"
        />
      </div>
    )
  }
}

export default withStyles(styles)(Filters)
    