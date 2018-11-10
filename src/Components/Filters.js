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
    this.setState({ [name]: event.target.checked }, () => {
      // reset offset when filtering
      this.props.callFromParent(0)
      // find the intersection when filtering
      let selectedData = this.props.rows.filter((row) => this.state.isVerified ? row.isVerified : true )
                         .filter((row) => this.state.isSensitive ? row.isSensitive : true)
                         .filter((row) => this.state.isSpam ? row.isSpam : true)
      this.setState({displayedData: selectedData})
    })
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
    