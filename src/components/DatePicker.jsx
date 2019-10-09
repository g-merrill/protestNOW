import React, { Component } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './css/DatePicker.css';

class DatePicker extends Component {
  render() {
    return (
      <SingleDatePicker
        date={this.props.date} // momentPropTypes.momentObj or null
        onDateChange={this.props.onDateChange} // PropTypes.func.isRequired
        focused={this.props.focused} // PropTypes.bool
        onFocusChange={this.props.onFocusChange} // PropTypes.func.isRequired
        id="protestDatePicker" // PropTypes.string.isRequired,      />
      />
    );
  }
}

export default DatePicker;
