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
  requestedData: {},
  isPending: false,
  error: '',
  scrollDownEnable: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        requestedData: action.updatedMessages,
      };
    case types.HIDE_SCROLL_BUTTON:
      return {
        ...state,
        scrollDownEnable: action.scrollDownEnable,
      };
    case types.REQUEST_DATA_PENDING:
      return {
        ...state,
        isPending: action.isPending,
      };
    case types.REQUEST_DATA_SUCCESS:
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
    case types.DEFAULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

// ACTIONS
const setUpdatedTimeStampData = () => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getInitialData = getRequestedData(chatStore);
  /* console.log('VOULA', getInitialData);*/
  const performTimeConversion = [];
  for (let i = 0, len = getInitialData.length; i < len; i += 1) {
    const getTimeStamp = getInitialData[i].timestamp;
    getInitialData[i].date = timeConverter(getTimeStamp).date;
    getInitialData[i].time = timeConverter(getTimeStamp).time;
    getInitialData[i].height = 45;
    performTimeConversion.push(getInitialData[i]);
  }
  dispatch({
    type: types.CONVERT_TO_DATE,
    convertedData: performTimeConversion,
  });
};

const setReadMessages = (messages) => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getInitialData = getRequestedData(chatStore);
  const performUpdateReadMessages = [];
  /* const getChunkData = getInitialData.slice(0, filteredSeenMessages.length);*/
  const getRestOfTheChunkData = getInitialData.slice(messages, getInitialData.length);
  for (let i = 0, len = messages; i < len; i += 1) {
    if (getInitialData[i].direction === 'in') {
      getInitialData[i].status = 'read';
    }
    performUpdateReadMessages.push(getInitialData[i]);
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
  const clonedData = getCurrentData.slice(0);
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
  clonedData.push(newMessage);
  dispatch({
    type: types.ADD_NEW_MESSAGES,
    updatedMessages: clonedData,
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
  if (id == 1) {
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
