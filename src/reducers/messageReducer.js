/* eslint-disable linebreak-style */
export const types = {
  SET_LAST_MESSAGE_REF: 'SET_LAST_MESSAGE_REF',
};

export const INITIAL_STATE = {
  messagesEndRef: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LAST_MESSAGE_REF:
      return {
        ...state,
        messagesEndRef: action.messagesEndRef,
      };
    default:
      return state;
  }
};

// ACTIONS
const setLastMessageRef = (messageRef) => (dispatch) => {
  dispatch({
    type: types.SET_LAST_MESSAGE_REF,
    messagesEndRef: messageRef,
  });
};

export const actions = {
  setLastMessageRef,
};
// SELECTORS
const getLastMessageRef = (state) => state.messagesEndRef;

export const selectors = {
  getLastMessageRef,
};
