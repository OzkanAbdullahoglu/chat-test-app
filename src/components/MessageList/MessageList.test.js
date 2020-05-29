/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MessageList from './MessageList';
import { storeFactory } from '../../utils/testUtil';

const setup = (state = {}) => {
  const store = storeFactory(state);
  return shallow(<MessageList store={store} />).dive().dive();
};

describe('MessageList Component', () => {
  const messageList = setup();
  it('renders without crashing', () => {
    expect(toJson(messageList)).toMatchSnapshot();
  });
  it('contains Wrapper component', () => {
    expect(messageList.find('[data-test="wrapper"]').exists()).toBe(true);
  });
  it('contains SvgIcon component', () => {
    expect(messageList.find('[data-test="svg-icon"]').exists()).toBe(true);
  });
  it('contains Virtualised List component', () => {
    expect(messageList.find('[className="list-root"]').exists()).toBe(true);
  });
  it('contains TextInput component', () => {
    expect(messageList.find('Connect(TextInput)').exists()).toBe(true);
  });
});

describe('redux properties', () => {
  const store = storeFactory();
  const wrapper = shallow(<MessageList store={store} />).dive();
  it('has access to `requestedData` state', () => {
    const requestedData = [];
    const requestedDataProp = wrapper.props().store.getState().chat.requestedData;
    expect(requestedDataProp).toEqual(requestedData);
  });
  it('has access to `scrollDownEnable` state', () => {
    const isScrollDownEnable = true;
    const isScrollDownProp = wrapper.props().store.getState().chat.scrollDownEnable;
    expect(isScrollDownProp).toEqual(isScrollDownEnable);
  });
});
