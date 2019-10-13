import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';
import DatePicker from '../components/DatePicker';
import { SingleDatePickerPhrases } from '../defaultPhrases';
import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from '../constants';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import './css/ProtestCreatePage.css';
import protestService from '../utils/protestService';


const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  initialDate: momentPropTypes.momentObj,

  ...omit(SingleDatePickerShape, [
    'date',
    'onDateChange',
    'focused',
    'onFocusChange',
  ]),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases,
};

class ProtestCreatePage extends Component {

  state = {
    name: '',
    date: this.props.initialDate,
    city: '',
    location: '',
    creator: this.props.user.username,
    keywords: [],
    focused: this.props.autoFocus,
  };

  onDateChange = date => {
    this.setState({ date });
  }

  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  }

  handleChange = e => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleKeywords = () => {

  }

  handleDate = () => {

  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let protestInputs = {
        name: this.state.name,
        date: moment(this.state.date).toDate(),
        city: this.state.city,
        location: this.state.location,
        creator: this.state.creator,
        keywords: this.state.keywords,
      };
      // THIS IS THE BACKEND STUFF
      // below is the fetch call in the service file
      const protest = await protestService.addProtest(protestInputs);
      // THIS IS THE BACKEND STUFF
      this.props.addProtestToState(protest);
      // Successfully signed up - show GamePage
      this.props.history.push('/protests');
    } catch (err) {
      // Invalid user data (probably duplicate protest name)
      console.log(err);
    }
  }

  render() {
    const focused = this.state.focused;
    const date = this.state.date;

    // autoFocus and initialDate are helper props for the example wrapper but are not
    // props on the SingleDatePicker itself and thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
    ]);

    return (
      <div className='ProtestCreatePage'>
        <h3 className="page-header">Submit an Upcoming Protest to protestNOW:</h3>
        <form className="form-horizontal protest-create-form" onSubmit={this.handleSubmit} >
          <div className="form-group input-ctnr-div">
            <p className='input-label'>Name of the protest&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div>
              <input type="text" className="form-control" placeholder="Protest Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group input-ctnr-div">
            <p className='input-label'>Date&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div className="DatePicker-ctnr">
              <DatePicker
                {...props}
                id="protestDatePickerContainer"
                date={date}
                focused={focused}
                onDateChange={this.onDateChange}
                onFocusChange={this.onFocusChange}
                initialDate={{
                  _isAMomentObject: true,
                  _isUTC: false,
                  _pf: {
                    empty: false,
                    unusedTokens: [],
                    unusedInput: []
                  }
                }}
                showClearDate
                reopenPickerOnClearDate
              />
            </div>
          </div>
          <div className="form-group input-ctnr-div">
            <p className='input-label'>City&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div>
              <input type="text" className="form-control" placeholder="City" value={this.state.city} name="city" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group input-ctnr-div">
            <p className='input-label'>Location in the city&nbsp;&nbsp;=>&nbsp;&nbsp;</p>
            <div>
              <input type="text" className="form-control" placeholder="Location" value={this.state.location} name="location" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="submit-btn-row">
              <button className="btn btn-default submit-btn">Create Protest</button>&nbsp;&nbsp;
              <div>
                <Link className="cancel-btn" to='/'>Cancel</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ProtestCreatePage.propTypes = propTypes;
ProtestCreatePage.defaultProps = defaultProps;

export default ProtestCreatePage;
