/* eslint-disable linebreak-style */
import { timeConverter } from '../utils/helper';
const fetchURL = 'https://raw.githubusercontent.com/OzkanAbdullahoglu/chat-test-app/master/src/data/messageData.json';
export const types = {
  CONVERT_TO_DATE: 'CONVERT_TO_DATE',
  UPDATE_READ_MESSAGES: 'UPDATE_READ_MESSAGES',
  ADD_NEW_MESSAGES: 'ADD_NEW_MESSAGES',
  HIDE_SCROLL_BUTTON: 'HIDE_SCROLL_BUTTON',
  REQUEST_DATA_PENDING: 'REQUEST_DATA_PENDING',
  REQUEST_DATA_SUCCESS: 'REQUEST_DATA_SUCCESS',
  REQUEST_DATA_FAILED: 'REQUEST_DATA_FAILED',
  SET_LAST_MESSAGE_REF: 'SET_LAST_MESSAGE_REF',

  DEFAULTS: 'DEFAULTS',

};

export const INITIAL_STATE = {
  requestedData: [],
  isPending: false,
  error: '',
  scrollDownEnable: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_DATA_PENDING:
      return {
        ...state,
        isPending: action.isPending,
      };
    case types.REQUEST_DATA_SUCCESS:
      if (state.requestedData.length > 0) {
        return {
          ...state,
          isPending: false,
          requestedData: [...state.requestedData],
        };
      }
      return {
        ...state,
        isPending: action.isPending,
        requestedData: action.requestedData,
      };
    case types.REQUEST_DATA_FAILED:
      return {
        ...state,
        isPending: action.isPending,
        error: action.error,
      };
    case types.CONVERT_TO_DATE:
      return {
        ...state,
        requestedData: action.convertedData,
      };
    case types.UPDATE_READ_MESSAGES:
      return {
        ...state,
        requestedData: action.readMessages,
      };
    case types.ADD_NEW_MESSAGES:
      return {
        ...state,
        requestedData: [...state.requestedData, action.updatedMessages],
      };
    case types.HIDE_SCROLL_BUTTON:
      return {
        ...state,
        scrollDownEnable: action.scrollDownEnable,
      };

    case types.DEFAULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

// ACTIONS
const setRequestedData = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_DATA_PENDING,
    isPending: true,
  });
  fetch(fetchURL)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: types.REQUEST_DATA_SUCCESS,
        isPending: false,
        requestedData: data,
      }))
    .catch((error) =>
      dispatch({
        type: types.REQUEST_DATA_FAILED,
        isPending: false,
        error,
      }));
};
const setUpdatedTimeStampData = () => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getInitialData = getRequestedData(chatStore);
  const updatedData = [...getInitialData];
  const performTimeConversion = [];
  for (let i = 0, len = updatedData.length; i < len; i += 1) {
    const getTimeStamp = updatedData[i].timestamp;
    updatedData[i].date = timeConverter(getTimeStamp).date;
    updatedData[i].time = timeConverter(getTimeStamp).time;
    performTimeConversion.push(updatedData[i]);
  }
  dispatch({
    type: types.CONVERT_TO_DATE,
    convertedData: performTimeConversion,
  });
};

const setReadMessages = (messages) => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getCurrentData = getRequestedData(chatStore);
  const performUpdateReadMessages = [];
  /* const getChunkData = getCurrentData.slice(0, filteredSeenMessages.length);*/
  const getRestOfTheChunkData = getCurrentData.slice(messages, getCurrentData.length);
  for (let i = 0, len = messages; i < len; i += 1) {
    if (getCurrentData[i].direction === 'in') {
      getCurrentData[i].status = 'read';
    }
    performUpdateReadMessages.push(getCurrentData[i]);
  }
  const concatDataBack = performUpdateReadMessages.concat(getRestOfTheChunkData);
  dispatch({
    type: types.UPDATE_READ_MESSAGES,
    readMessages: concatDataBack,
  });
};

const setAddNewMessages = (message) => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getCurrentData = getRequestedData(chatStore);
  const assignId = getCurrentData[getCurrentData.length - 1].id + 1;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const newMessage = {};
  newMessage.id = assignId;
  newMessage.direction = 'out';
  newMessage.status = 'sent';
  newMessage.timestamp = timestamp;
  newMessage.text = message;
  newMessage.date = timeConverter(timestamp).date;
  newMessage.time = timeConverter(timestamp).time;
  dispatch({
    type: types.ADD_NEW_MESSAGES,
    updatedMessages: newMessage,
  });
};

const setToggleScrollDownDisable = () => (dispatch) => {
  dispatch({
    type: types.HIDE_SCROLL_BUTTON,
    scrollDownEnable: false,
  });
};
const setToggleScrollDownEnable = () => (dispatch) => {
  dispatch({
    type: types.HIDE_SCROLL_BUTTON,
    scrollDownEnable: true,
  });
};


const setDefault = () => ({
  type: types.DEFAULTS,
});

export const actions = {
  setUpdatedTimeStampData,
  setDefault,
  setReadMessages,
  setAddNewMessages,
  setToggleScrollDownDisable,
  setToggleScrollDownEnable,
  setRequestedData,
};
// SELECTORS
const getScrollDownVisibilityStatus = (state) => state.scrollDownEnable;
const getRequestedData = (state) => state.requestedData;
const getPendingStatus = (state) => state.isPending;
const getShowTimeStampBool = (state, id) => {
  if (id === 1) {
    return true;
  }
  if (state.requestedData[id - 2].date !== state.requestedData[id - 1].date) {
    return true;
  }
  return false;
};

const getUnreadMessages = (state) => {
  const unreadMessageIds = [];
  const currentData = state.requestedData;
  for (let i = 0, len = currentData.length; i < len; i += 1) {
    if (currentData[i].direction === 'in' && currentData[i].status === 'received') {
      unreadMessageIds.push(currentData[i].id);
    }
  }
  return {
    count: unreadMessageIds.length,
    firstUnreadId: unreadMessageIds[0] || 'none',
  };
};

export const selectors = {
  getRequestedData,
  getShowTimeStampBool,
  getUnreadMessages,
  getScrollDownVisibilityStatus,
  getPendingStatus,
};
