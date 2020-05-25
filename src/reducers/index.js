/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';
import chatReducer, {
  selectors as chatSelectors,
  actions as chatActions,
  types as chatTypes,
} from './chatReducer';
import messageReducer, {
  selectors as messageSelectors,
  actions as messageActions,
  types as messageTypes,
} from './messageReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
  message: messageReducer,
  version: () => ({
    number: '0.0.1',
  }),
});

export const getRequestedData = (store) =>
  chatSelectors.getRequestedData(store.chat);
export const getUnreadMessages = (store) =>
  chatSelectors.getUnreadMessages(store.chat);
export const getScrollDownVisibilityStatus = (store) =>
  chatSelectors.getScrollDownVisibilityStatus(store.chat);
export const getPendingStatus = (store) =>
  chatSelectors.getPendingStatus(store.chat);
export const getShowTimeStampBool = (store) => (id) =>
  chatSelectors.getShowTimeStampBool(store.chat, id);

export const getLastMessageRef = (store) =>
  messageSelectors.getLastMessageRef(store.message);

export { chatActions, chatTypes, messageActions, messageSelectors };

export default rootReducer;
