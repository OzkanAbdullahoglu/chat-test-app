/* eslint-disable linebreak-style */
import React, { Component, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import './Header.css';
import {
  chatActions, getUnreadMessages,
} from '../../reducers';
import { Wrapper } from '../Wrapper/Wrapper';
import { Icon } from '../Icon/Icon';

const Header = ({
  unreadMessages,
  incomingIcon,
  incomingAvatar,
}) => {
  const initialRef = useRef(null);
  useEffect(() => {
    initialRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-root" ref={initialRef}>
      {incomingAvatar ? (
        <div className="header-root incoming-user">
          <Wrapper incomingIcon>
            <Icon
              incomingIcon
              viewBox="0 0 141.732 141.732"
            >
              <path
                d="M105.614,118.681c3.398,3.396,3.4,8.912,0,12.311c-3.396,3.399-8.91,3.398-12.311,0c-0.02-0.02-0.035-0.04-0.053-0.061
               l-0.025,0.022l-57.66-57.66l0.024-0.022c-1.61-1.579-2.608-3.775-2.608-6.208c-0.002-2.73,1.258-5.166,3.229-6.762l-0.06-0.058
                 l57.66-57.66l0.025,0.024c0.018-0.021,0.033-0.039,0.053-0.058c3.4-3.4,8.912-3.4,12.312,0c3.398,3.396,3.398,8.908,0,12.311
                   c-0.021,0.02-0.041,0.034-0.061,0.054l0.023,0.024L54.043,67.063l51.54,51.54l-0.025,0.021
                     C105.573,118.646,105.594,118.66,105.614,118.681"
              />
            </Icon>
          </Wrapper>
          <Wrapper incomingAvatar>
            <Icon
              incomingAvatar
              viewBox="0 0 24 24"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </Icon>
          </Wrapper>
          <div className="header-content">
            <span
              className="header-text"
            >User 2 </span>
          </div>
        </div>
      ) : (
        <div className="header-root" >
          <Wrapper incomingAvatar={false}>
            <Icon
              incomingAvatar={false}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </Icon>
          </Wrapper>
          <div className="header-content">
            <span
              className="header-text"
            >User 1 ({unreadMessages.count} new messages)</span>
          </div>
        </div>
      )
      }
    </div>
  );
};


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

