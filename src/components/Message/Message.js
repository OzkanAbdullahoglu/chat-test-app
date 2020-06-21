/* eslint-disable linebreak-style */
import React from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import './Message.css';
const Message = ({
  pack,
}) => {
  const IconStyle = {
    fontSize: '1rem',
    padding: 0,
    float: 'right',
    alignSelf: 'center',
    color: pack.status === 'read' ? 'blue' : '#777',
  };
  return (
    <div className="list-item-root">
      <div className="list-item-text-root">
        {pack.direction === 'out' ? (
          <div className="list-item-text-primary message-out">
            <span data-test="item-text">{pack.text}</span>
            <span
              className="time-inline"
            >{pack.time}</span>
            <Icon
              style={IconStyle}
              data-test={pack.status === 'sent' ? 'sent-icon' : 'read-icon'}
            >{pack.status === 'sent' ? 'done' : 'done_all'}</Icon>
          </div>
        ) : (
          <div className="list-item-text-primary">
            <span data-test="item-text">{pack.text}</span>
            <span className="time-inline">{pack.time}</span>
          </div>
        )
        }
      </div>
    </div>
  );
};

Message.propTypes = {
  pack: PropTypes.object,
};

export default Message;
