/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { Wrapper } from '../Wrapper/Wrapper';
import SvgIcon from '../Icon/Icon';
import './TextInput.css';
import {
  chatActions,
  getUnreadMessages,
} from '../../reducers';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

    handleChange =(event) => {
      this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
      const { setAddNewMessages,
        scrollToBottom,
        scrollToFirstUnread,
        unreadMesssages } = this.props;
      const { firstUnreadId } = unreadMesssages;
      if (this.state.value !== '') {
        setAddNewMessages(this.state.value);
        if (firstUnreadId !== 'none') {
          scrollToFirstUnread();
        } else {
          scrollToBottom();
        }
        this.setState({ value: '' });
        event.preventDefault();
      }
    }

    handleKeyPress = (event) => {
      const textInput = document.getElementById('standard-basic').value;
      if (event.nativeEvent.keyCode === 13 && textInput === '') {
        event.preventDefault();
      }
    }
    render() {
      return (
        <form className="form-main" onSubmit={this.handleSubmit} autoComplete={'off'}>
          <div className="form-control-root">
            <input
              placeholder="Sending Message..."
              id="standard-basic"
              type="text"
              className="base-input"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.value}
              autoComplete={'off'}
            />
            <Wrapper
              sendIcon
              aria-label="Click to send a message"
              tabIndex="0"
            >
              <SvgIcon
                sendIcon
                viewBox="0 0 24 24"
                onClick={this.handleSubmit}
                data-test="svg-icon"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </SvgIcon>
            </Wrapper>
          </div>
        </form>
      );
    }
}

TextInput.propTypes = {
  setAddNewMessages: PropTypes.func,
  scrollToBottom: PropTypes.func,
  scrollToFirstUnread: PropTypes.func,
  unreadMesssages: PropTypes.object,
};

const mapStateToProps = (store) => ({
  unreadMesssages: getUnreadMessages(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(TextInput);
