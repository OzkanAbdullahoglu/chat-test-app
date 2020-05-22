/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { Wrapper } from '../Wrapper/Wrapper';
import { Icon } from '../Icon/Icon';
import Message from '../Message/Message';
import Date from '../Date/Date';
import TextInput from '../TextInput/TextInput';
import './MessageList.css';
import {
  chatActions,
  getData,
  getShowTimeStampBool,
  getUnreadMessages,
} from '../../reducers';


class MessageList extends Component {
  constructor(props) {
    super(props);
    /* console.log(props.updatedInitialData, 'DATA');*/
    this.initialRef = React.createRef();
    this.topOfTheListRef = React.createRef();
    this.listElementRefs = props.updatedInitialData.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    this.messagesEnd = React.createRef();
    this.verticalPos = {};
  }


  componentDidMount() {
    /* this.props.setDefault();*/
    this.props.setUpdatedTimeStampData();
    this.verticalPos = this.getVerticalPositions();
  }


  shouldComponentUpdate(nextProps, nextState) {
    const {
      showTimeStampBool,
      setReadMessages,
      setUpdatedTimeStampData,
      windowHeight,
      unreadMesssages,
      updatedInitialData,
    } = this.props;

    return (
      showTimeStampBool !== nextProps.showTimeStampBool ||
      setReadMessages !== nextProps.setReadMessages ||
      setUpdatedTimeStampData !== nextProps.setUpdatedTimeStampData ||
      windowHeight !== nextProps.windowHeight ||
      updatedInitialData.length !== nextProps.updatedInitialData.length ||
      unreadMesssages !== nextProps.unreadMesssages
    );
  }

  componentDidUpdate(prevProps) {
    const { updatedInitialData } = this.props;
    if (updatedInitialData.length !== prevProps.updatedInitialData.length) {
      console.log(updatedInitialData[updatedInitialData.length - 1].id, 'whatis');
      this.listElementRefs[updatedInitialData[updatedInitialData.length - 1].id] = React.createRef();
    }
  }

  onScroll = () => {
    const messagePosArr = this.verticalPos;
    const { windowHeight, setReadMessages } = this.props;
    const scrollTop = this.topOfTheListRef.current.scrollTop;
    const fixedHeaderHeight = 100;
    const scrollViewHeight = windowHeight - fixedHeaderHeight;
    const dynamicViewableScreen = scrollViewHeight + scrollTop;
    /* console.log(scrollTop - messagePosArr[messagePosArr.length - 1] + scrollViewHeight);*/
    setReadMessages(messagePosArr, dynamicViewableScreen);
  }


  getVerticalPositions = () => {
    const { updatedInitialData } = this.props;
    /* console.log(this.listElementRefs);*/
    const positions = updatedInitialData.map(
      (pack) => {
        const { offsetTop, offsetHeight } = this.listElementRefs[pack.id].current;
        return (offsetTop + offsetHeight);
      });
    /* const debug = [];
    for (let i = 0; i < updatedInitialData.length; i += 1) {
      const debugObj = {};
      debugObj.id = updatedInitialData[i].id;
      debugObj.text = updatedInitialData[i].text;
      debugObj.offsetTop = this.listElementRefs[updatedInitialData[i].id].current.offsetTop;
      debugObj.offset = this.listElementRefs[updatedInitialData[i].id].current.offsetHeight;
      debug.push(debugObj);
    }
    console.log(debug);*/

    return positions;
  }

  scrollToBottom = () => {
    const { updatedInitialData } = this.props;
    this.listElementRefs[updatedInitialData[updatedInitialData.length - 1].id]
      .current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  handleClick = () => {
    const { firstUnreadId } = this.props.unreadMesssages;
    if (firstUnreadId !== 'none') {
      this.listElementRefs[firstUnreadId].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  hideButton = () => {
    const { firstUnreadId } = this.props.unreadMesssages;
    /* console.log(firstUnreadId, 'FIRSTUNREAD');*/
    if (firstUnreadId === 'none') {
      return true;
    }
    return false;
  }

  revealButton = () => {
    const scrollTop = this.topOfTheListRef.current.scrollTop;
  }
  render() {
    const { updatedInitialData, showTimeStampBool } = this.props;
    return (
      <div
        className="main-list"
        ref={this.topOfTheListRef}
        onScroll={this.onScroll}
      >
        <Wrapper
          incomingIcon
          scrollDown
          appearance={this.hideButton()}
        >
          <Icon
            incomingIcon
            scrollDown
            viewBox="0 0 141.732 141.732"
            onClick={this.handleClick}
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
        <ul className="list-root">
          {updatedInitialData.map((pack) =>
            showTimeStampBool(pack.id) ? (
              <li className="list-item-container" ref={this.listElementRefs[pack.id]} key={pack.id}>
                <Date pack={pack} />
                <Message pack={pack} />
              </li>
            ) : (
              <li className="list-item-container" ref={this.listElementRefs[pack.id]} key={pack.id}>
                <Message pack={pack} />
              </li>
            )
          )}
          <div style={{ height: '10px' }} ref={this.messagesEnd} />
        </ul>
        <TextInput scrollToBottom={this.scrollToBottom} />
      </div>
    );
  }
}

MessageList.propTypes = {
  updatedInitialData: PropTypes.array,
  showTimeStampBool: PropTypes.func,
  setReadMessages: PropTypes.func,
  setUpdatedTimeStampData: PropTypes.func,
  windowHeight: PropTypes.number,
  unreadMesssages: PropTypes.object,

};

const mapStateToProps = (store) => ({
  updatedInitialData: getData(store),
  showTimeStampBool: getShowTimeStampBool(store),
  unreadMesssages: getUnreadMessages(store),
});

const withRedux = connect(
  mapStateToProps,
  { ...chatActions }
);

export default compose(withRedux)(MessageList);
