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

  render() {
    const { classes, isVerified, isSensitive, isSpam, handleChange} = this.props;
    return (
      <div>     
        <FormControlLabel
          control = {
            <Checkbox
              checked = {isVerified}
              onChange = {handleChange('isVerified')}
              value = "isVerified"
              classes = {{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label = "Verified"
        />
        <FormControlLabel
          control = {
            <Checkbox
              checked = {isSensitive}
              onChange = {handleChange('isSensitive')}
              value = "isSensitive"
              classes = {{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label = "Sensitive"
        />
        <FormControlLabel
          control = {
            <Checkbox
              checked = {isSpam}
              onChange = {handleChange('isSpam')}
              value = "isSpam"
              classes = {{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label = "Spam"
        />
      </div>
    )
  }
}

export default withStyles(styles)(Filters)
    