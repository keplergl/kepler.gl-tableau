import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import { Radio } from '@tableau/tableau-ui';

// icons
import Save from '@material-ui/icons/Save';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  radio: {
    '&$checked': {
      color: 'rgb(232, 118, 44)'
    }
  },
  checked: {}
});

class RadioButtonsGroup extends React.Component {
  constructor (props) {
    super(props);
    console.log('props', this.props);
    this.state = {
      value: this.props.selectedValue || ""
    };
  }

  // handleChange = event => {
  //   this.setState({ value: event.target.value });
  // };

  handleClick = event => {
    console.log('handleClick', this.props.field, event.target.value);
    if ( event.target.value ) {
      this.props.sheetCallBack(this.props.field, event.target.value);
    }
    if ( this.props.customChange ) {
      this.props.customChange(event);
    }
  }


  componentWillUpdate(nextProps, nextState) {
    // if we get a new field, reset value to existing tableau setting
    if (this.props.field !== nextProps.field || this.state.value !== nextProps.selectedValue) {
      console.log('sheetRadioUpdate', this.props, this.state);
      this.setState({
        value: nextProps.selectedValue || ""
      })
    }
  }
  
  render() {
    const { classes, sheets, title, helperText, customChange } = this.props;

    // const changeCallBack = customChange || this.handleChange;

    console.log('sheetRadio', this.props, this.state);
    return (
      <div className={classes.root}>
        <div>
          {sheets.map(sheetName => (
            <React.Fragment>
              <Radio 
                key={sheetName}
                value={sheetName}
                checked={this.state.value === sheetName}
                onChange={this.handleClick}
              >
              {sheetName}
              </Radio>
              <br/>
            </React.Fragment>
          ))}
        </div>
    </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
