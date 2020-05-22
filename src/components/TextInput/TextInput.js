/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { Wrapper } from '../Wrapper/Wrapper';
import { Icon } from '../Icon/Icon';
import './TextInput.css';
import {
  chatActions,
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
      const { setAddNewMessages, scrollToBottom } = this.props;
      setAddNewMessages(this.state.value);
      scrollToBottom();
      this.setState({ value: '' });
      event.preventDefault();
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
              value={this.state.value}
            />
            <Wrapper
              sendIcon
            >
              <Icon
                sendIcon
                viewBox="0 0 24 24"
                onClick={this.handleSubmit}
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </Icon>
            </Wrapper>
          </div>
        </form>
      );
    }
}

TextInput.propTypes = {
  setAddNewMessages: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

const mapStateToProps = (store) => ({});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(TextInput);
