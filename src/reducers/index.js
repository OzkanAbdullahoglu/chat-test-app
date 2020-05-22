/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';
import chatReducer, {
  selectors as chatSelectors,
  actions as chatActions,
  types as chatTypes,
} from './chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
  version: () => ({
    number: '0.0.1',
  }),
});

export const getData = (store) =>
  chatSelectors.getData(store.chat);
export const getUnreadMessages = (store) =>
  chatSelectors.getUnreadMessages(store.chat);

export const getShowTimeStampBool = (store) => (id) =>
  chatSelectors.getShowTimeStampBool(store.chat, id);

export { chatActions, chatTypes };

export default rootReducer;
