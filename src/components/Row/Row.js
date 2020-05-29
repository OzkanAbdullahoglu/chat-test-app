/* eslint-disable linebreak-style */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import '../Row/Row.css';
import Date from '../Date/Date';
import {
  messageActions,
  getRequestedData,
  getShowTimeStampBool,
} from '../../reducers';

const Row = ({
  index,
  style,
  showTimeStampBool,
  updatedInitialData,
  setLastMessageRef }) => {
  const items = updatedInitialData;
  const messagesEnd = useRef();
  useEffect(() => {
    if (index === items.length - 1) {
      setLastMessageRef(messagesEnd);
    }
  }, []
  );
  return (
    showTimeStampBool(items[index].id) ? (
      <div style={style} className={`list-item-container ${index}`} key={items[index].id}>
        <Date pack={items[index]} />
        <Message pack={items[index]} />
        {index === items.length - 1 ? (
          <div className="list-end-message list-item-container" ref={messagesEnd}></div>
        ) : null
        }
      </div>
    ) : (
      <div style={style} className={`list-item-container ${index}`} key={items[index].id}>
        <Message pack={items[index]} />
        {index === items.length - 1 ? (
          <div className="list-end-message list-item-container" ref={messagesEnd}></div>
        ) : null
        }
      </div>
    )
  );
};

Row.propTypes = {
  updatedInitialData: PropTypes.array,
  showTimeStampBool: PropTypes.func,
  setLastMessageRef: PropTypes.func,
  index: PropTypes.number,
  style: PropTypes.object,
};

const mapStateToProps = (store) => ({
  updatedInitialData: getRequestedData(store),
  showTimeStampBool: getShowTimeStampBool(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...messageActions },
  null,
  { forwardRef: true },
);

export default compose(withRedux)(Row);
