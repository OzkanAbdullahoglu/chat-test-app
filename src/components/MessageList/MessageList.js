/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { VariableSizeList } from 'react-window';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { Wrapper } from '../Wrapper/Wrapper';
import { Icon } from '../Icon/Icon';
import TextInput from '../TextInput/TextInput';
import Row from '../Row/Row';
import './MessageList.css';
import {
  chatActions,
  getRequestedData,
  getShowTimeStampBool,
  getUnreadMessages,
  getScrollDownVisibilityStatus,
  getLastMessageRef,
} from '../../reducers';

const MessageList = ({
  updatedInitialData,
  setUpdatedTimeStampData,
  showTimeStampBool,
  unreadMesssages,
  setReadMessages,
  setToggleScrollDownDisable,
  setToggleScrollDownEnable,
  isScrollDownVisible,
  lastMessageInList,
  setDefault,
}) => {
  useEffect(() => { setUpdatedTimeStampData(); }, []);
  const listRef = React.createRef();
  const items = updatedInitialData;
  const defaultItemSize = 45;
  const doubleItemSize = 90;
  const getItemSize = (index) => showTimeStampBool((items[index].id)) ? doubleItemSize : defaultItemSize;
  const scrollToBottom = () => {
    if (lastMessageInList.current !== undefined) {
      lastMessageInList.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  const handleClick = () => {
    const { firstUnreadId } = unreadMesssages;
    if (firstUnreadId !== 'none') {
      listRef.current.scrollToItem(firstUnreadId, {
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  const onItemsRendered = (item) => {
    const { firstUnreadId } = unreadMesssages;
    /* console.log(unreadMesssages);
    console.log(item, 'RENDER');*/
    const hideScrollButtonToBottom = 10;
    const visibleMessages = item.visibleStopIndex + 1;
    if (visibleMessages >= firstUnreadId) {
      setReadMessages(visibleMessages);
    }
    if (firstUnreadId === 'none' && items.length - visibleMessages < hideScrollButtonToBottom) {
      setToggleScrollDownDisable();
    } else {
      setToggleScrollDownEnable();
    }
  };

  return (
    <div className="main-list">
      <Wrapper
        incomingIcon
        scrollDown
        hideButton={!isScrollDownVisible}
      >
        <Icon
          incomingIcon
          scrollDown
          viewBox="0 0 48 48"
          onClick={handleClick}
        >
          <path xmlns="http://www.w3.org/2000/svg" d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z" />
          <path xmlns="http://www.w3.org/2000/svg" d="M0 0h48v48h-48z" fill="none" />
        </Icon>
      </Wrapper>
      <VariableSizeList
        ref={listRef}
        height={615}
        width={480}
        itemSize={getItemSize}
        itemCount={items.length}
        className="list-root"
        overscanCount={30}
        onItemsRendered={onItemsRendered}
      >
        {Row}
      </VariableSizeList>
      <TextInput scrollToBottom={scrollToBottom} />
    </div>
  );
};

MessageList.propTypes = {
  updatedInitialData: PropTypes.array,
  showTimeStampBool: PropTypes.func,
  isScrollDownVisible: PropTypes.bool,
  setReadMessages: PropTypes.func,
  lastMessageInList: PropTypes.string,
  setUpdatedTimeStampData: PropTypes.func,
  setToggleScrollDownDisable: PropTypes.func,
  setToggleScrollDownEnable: PropTypes.func,
  unreadMesssages: PropTypes.object,
};

const mapStateToProps = (store) => ({
  updatedInitialData: getRequestedData(store),
  showTimeStampBool: getShowTimeStampBool(store),
  unreadMesssages: getUnreadMessages(store),
  isScrollDownVisible: getScrollDownVisibilityStatus(store),
  lastMessageInList: getLastMessageRef(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);


export default compose(withRedux)(MessageList);
