/* eslint-disable linebreak-style */
import messageData from '../data/messageData.json';
import { timeConverter } from '../utils/helper';
export const types = {
  CONVERT_TO_DATE: 'CONVERT_TO_DATE',
  UPDATE_READ_MESSAGES: 'UPDATE_READ_MESSAGES',
  ADD_NEW_MESSAGES: 'ADD_NEW_MESSAGES',
  DEFAULTS: 'DEFAULTS',

};

export const INITIAL_STATE = {
  initialData: messageData,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONVERT_TO_DATE:
      return {
        initialData: action.convertedData,
      };
    case types.UPDATE_READ_MESSAGES:
      return {
        initialData: action.readMessages,
      };
    case types.ADD_NEW_MESSAGES:
      return {
        initialData: action.updatedMessages,
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
  const getInitialData = getData(chatStore);
  const performTimeConversion = [];
  for (let i = 0, len = getInitialData.length; i < len; i += 1) {
    const getTimeStamp = getInitialData[i].timestamp;
    getInitialData[i].date = timeConverter(getTimeStamp).date;
    getInitialData[i].time = timeConverter(getTimeStamp).timed;
    performTimeConversion.push(getInitialData[i]);
  }
  dispatch({
    type: types.CONVERT_TO_DATE,
    convertedData: performTimeConversion,
  });
};

const setReadMessages = (messages, screenPos) => (dispatch, getStore) => {
  const chatStore = getStore().chat;
  const getInitialData = getData(chatStore);
  const filteredSeenMessages = messages.filter((message) => message < screenPos);
  const performUpdateReadMessages = [];
  /* const getChunkData = getInitialData.slice(0, filteredSeenMessages.length);*/
  const getRestOfTheChunkData = getInitialData.slice(filteredSeenMessages.length, getInitialData.length);
  for (let i = 0, len = filteredSeenMessages.length; i < len; i += 1) {
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
  const getCurrentData = getData(chatStore);
  const clonedData = getCurrentData.slice(0);
  const assignId = getCurrentData[getCurrentData.length - 1].id + 1;
  const timestamp = Math.floor(Date.now() / 1000);
  const newMessage = {};
  newMessage.id = assignId;
  newMessage.direction = 'out';
  newMessage.status = 'sent';
  newMessage.timestamp = timestamp;
  newMessage.text = message;
  clonedData.push(newMessage);
  dispatch({
    type: types.ADD_NEW_MESSAGES,
    updatedMessages: clonedData,
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
};
// SELECTORS
const getData = (state) => state.initialData;
const getShowTimeStampBool = (state, id) => {
  if (id == 1) {
    return true;
  }
  if (state.initialData[id - 2].date !== state.initialData[id - 1].date) {
    return true;
  }
  return false;
};

const getUnreadMessages = (state) => {
  const unreadMessageIds = [];
  const currentData = state.initialData;
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
  getData,
  getShowTimeStampBool,
  getUnreadMessages,
};
