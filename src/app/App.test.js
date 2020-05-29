/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import { storeFactory } from '../utils/testUtil';

const defaultProps = { isPending: false };
const setup = () => {
  const store = storeFactory();
  return shallow(<App store={store} {...defaultProps} />).dive().dive();
};
describe('App', () => {
  const wrapper = setup();
  it('renders without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('contains two Header Component', () => {
    expect(wrapper.find('Connect(Header)').length).toEqual(2);
  });
  it('contains two MessageList Component', () => {
    expect(wrapper.find('Connect(MessageList)').length).toEqual(1);
  });
});

describe('App', () => {
  it('contains two Spinner Component when `isPending` prop is true', () => {
    const wrapper = setup();
    wrapper.setProps({ isPending: true });
    expect(wrapper.find('[data-test="spinner"]').length).toEqual(1);
  });
});
