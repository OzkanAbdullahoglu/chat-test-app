/* eslint-disable linebreak-style */
import React from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import './Message.css';
const Message = ({
  pack,
}) => (
  <div className="list-item-root">
    <div className="list-item-text-root">
      {pack.direction === 'out' ? (
        <div className="list-item-text-primary message-out">
          <span>{pack.text}</span>
          <span
            className="time-inline"
          >{pack.time}</span>
          {pack.status === 'sent' ? (
            <Icon
              style={{
                fontSize: '1rem',
                color: 'gray',
                padding: 0,
                float: 'right',
                alignSelf: 'center',
              }}
            >done</Icon>
          ) : (
            <Icon
              style={{
                fontSize: '1rem',
                padding: 0,
                float: 'right',
                alignSelf: 'center',
                color: [pack.status === 'read' ? 'blue' : '#777'],
              }}
            >
            done_all
            </Icon>
          )

          }
        </div>
      ) : (
        <div className="list-item-text-primary">
          <span>{pack.text}</span>
          <span className="time-inline">{pack.time}</span>
        </div>
      )
      }
    </div>
  </div>
);

Message.propTypes = {
  pack: PropTypes.object,
};

export default Message;
