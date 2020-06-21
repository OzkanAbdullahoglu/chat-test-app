/* eslint-disable linebreak-style */
import React, { useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { Wrapper } from '../Wrapper/Wrapper';
import IconContainer from '../IconContainer/IconContainer';
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
  initialData,
  setUpdatedTimeStampData,
  showTimeStampBool,
  unreadMesssages,
  setReadMessages,
  setToggleScrollDownDisable,
  setToggleScrollDownEnable,
  isScrollDownVisible,
  endOfTheList,
  height,
  width,
}) => {
  useEffect(() => { setUpdatedTimeStampData(); }, []);
  useEffect(() => {
    const { firstUnreadId } = unreadMesssages;
    if (firstUnreadId === 'none') return scrollToTheLastMessage();
  }, []);

  const listRef = useRef();
  const fixedHeaderHeight = 120;
  const fixedTextInputHeight = 60;
  const fixedHeights = fixedHeaderHeight + fixedTextInputHeight;
  const items = initialData;
  const defaultItemSize = 45;
  const doubleItemSize = 90;
  const getItemSize = (index) => showTimeStampBool((items[index].id)) ? doubleItemSize : defaultItemSize;
  const scrollToBottom = () => {
    if (endOfTheList.current === null || endOfTheList.current === undefined) {
      scrollToTheLastMessage();
    } else {
      endOfTheList.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  const scrollToTheLastMessage = () => {
    if (listRef.current !== null || listRef.current !== undefined) {
      listRef.current.scrollToItem(items[items.length - 1].id + 2, {
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
    } else {
      scrollToBottom();
    }
  };

  const onItemsRendered = (item) => {
    const { firstUnreadId } = unreadMesssages;
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
        data-test="wrapper"
        aria-label="Scroll down to the first unread message"
        tabIndex="0"
      >
        <IconContainer
          incomingIcon
          scrollDown
          arrow
          viewBox="0 0 48 48"
          handleClick={handleClick}
        />
      </Wrapper>
      <VariableSizeList
        ref={listRef}
        height={height - fixedHeights}
        width={width}
        itemSize={getItemSize}
        itemCount={items.length}
        className="list-root"
        overscanCount={5}
        onItemsRendered={onItemsRendered}
      >
        {Row}
      </VariableSizeList>
      <TextInput
        scrollToBottom={scrollToBottom}
        scrollToFirstUnread={handleClick}
      />
    </div>
  );
};

MessageList.propTypes = {
  initialData: PropTypes.array,
  showTimeStampBool: PropTypes.func,
  isScrollDownVisible: PropTypes.bool,
  setReadMessages: PropTypes.func,
  endOfTheList: PropTypes.string,
  setUpdatedTimeStampData: PropTypes.func,
  setToggleScrollDownDisable: PropTypes.func,
  setToggleScrollDownEnable: PropTypes.func,
  unreadMesssages: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
};

const mapStateToProps = (store) => ({
  initialData: getRequestedData(store),
  showTimeStampBool: getShowTimeStampBool(store),
  unreadMesssages: getUnreadMessages(store),
  isScrollDownVisible: getScrollDownVisibilityStatus(store),
  endOfTheList: getLastMessageRef(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(MessageList);
