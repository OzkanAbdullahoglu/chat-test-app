/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import './Header.css';
import {
  chatActions, getUnreadMessages,
} from '../../reducers';
import { Wrapper } from '../Wrapper/Wrapper';
import SvgIcon from '../Icon/Icon';

const Header = ({
  unreadMessages,
  incomingIcon,
  incomingAvatar,
}) => (
  <div className="container-root">
    {incomingAvatar ? (
      <div className="header-root incoming-user">
        <Wrapper
          data-test="wrapper"
          incomingIcon
          aria-label="Back to chat screen"
          tabIndex="0"
        >
          <SvgIcon
            incomingIcon
            viewBox="0 0 48 48"
          >
            <path xmlns="http://www.w3.org/2000/svg" d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z" />
            <path xmlns="http://www.w3.org/2000/svg" d="M0 0h48v48h-48z" fill="none" />
          </SvgIcon>
        </Wrapper>
        <Wrapper
          incomingAvatar
          aria-label="View User 2 profile"
          tabIndex="0"
        >
          <SvgIcon
            incomingAvatar
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </SvgIcon>
        </Wrapper>
        <div className="header-content" tabIndex="0">
          <span
            className="header-text"
          >User 2</span>
        </div>
      </div>
    ) : (
      <div className="header-root" >
        <Wrapper
          data-test="wrapper"
          incomingAvatar={false}
          aria-label="View User 1 profile"
          tabIndex="0"
        >
          <SvgIcon
            incomingAvatar={false}
            viewBox="0 0 24 24"
            data-test="icon"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </SvgIcon>
        </Wrapper>
        <div className="header-content" tabIndex="0">
          <span
            className="header-text"
          >User 1 ({unreadMessages.count} new messages)</span>
        </div>
      </div>
    )
    }
  </div>
);

Header.propTypes = {
  unreadMessages: PropTypes.object,
  incomingIcon: PropTypes.bool,
  incomingAvatar: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  unreadMessages: getUnreadMessages(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(Header);
