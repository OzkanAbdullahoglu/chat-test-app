/* eslint-disable linebreak-style */
import { createStore, applyMiddleware } from 'redux';
import { middlewares } from '../store';
import rootReducer from '../reducers';

const chat = {
  requestedData: [
    {
      id: 1,
      direction: 'in',
      status: 'read',
      timestamp: '1577834102',
      text: 'Alice was beginning',
    },
  ],
  isPending: false,
  error: '',
  scrollDownEnable: true,
};

const message = {
  messagesEndRef: '',
};

const version = { number: '0.0.1' };

export const initialStates = { chat, message, version };

export const storeFactory = (initalState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, initalState);
};
