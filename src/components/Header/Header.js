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
import IconContainer from '../IconContainer/IconContainer';

const Header = ({
  unreadMessages,
  incomingIcon,
  incomingAvatar,
}) => (
  <div className="container-root">
    <div className={incomingAvatar ? 'header-root incoming-user' : 'header-root'}>
      <Wrapper
        data-test="wrapper"
        incomingIcon={incomingAvatar ? incomingIcon : false}
        aria-label={incomingAvatar ? 'Back to chat screen' : 'View User 1 profile'}
        tabIndex="0"
      >
        <IconContainer
          incomingIcon={incomingAvatar ? incomingIcon : false}
          arrow={!!incomingAvatar}
          scrollDown={false}
          viewBox={incomingAvatar ? '0 0 48 48' : '0 0 24 24'}
        />
      </Wrapper>
      {incomingAvatar ? (
        <Wrapper
          incomingAvatar
          aria-label="View User 2 profile"
          tabIndex="0"
        >
          <IconContainer
            incomingAvatar={incomingAvatar}
            arrow={false}
            scrollDown={false}
            viewBox="0 0 24 24"
          />
        </Wrapper>
      ) : null }
      <div className="header-content" tabIndex="0">
        <span
          className="header-text"
        >{incomingAvatar ? 'User 2' : `User 1 (${unreadMessages.count} new messages)`}</span>
      </div>
    </div>
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
