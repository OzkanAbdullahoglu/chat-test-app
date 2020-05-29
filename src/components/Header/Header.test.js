/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Header from './Header';
import { storeFactory } from '../../utils/testUtil';

const defaultProps = {
  incomingAvatar: false,
  unreadMessages: {
    count: 0,
    firstUnreadId: 5,
  } };
const setup = () => {
  const store = storeFactory();
  return shallow(<Header store={store} {...defaultProps} />).dive().dive();
};

describe('Header Component', () => {
  const header = setup();
  it('renders without crashing', () => {
    expect(toJson(header)).toMatchSnapshot();
  });
  it('contains Wrapper component', () => {
    expect(header.find('[data-test="wrapper"]').exists()).toBe(true);
  });
  it('contains SvgIcon component', () => {
    expect(header.find('[data-test="icon"]').exists()).toBe(true);
  });
});
describe('Header Component', () => {
  const header = setup();
  const { unreadMessages } = defaultProps;
  it('renders properly up to `incomingAvatar` and `unreadMessages` prop', () => {
    expect(header.find('[className="header-text"]').text()).toBe(`User 1 (${unreadMessages.count} new messages)`);
  });
  it('renders conditionally up to `incomingAvatar`', () => {
    header.setProps({
      incomingAvatar: true,
      unreadMessages: {
        count: 18,
        firstUnreadId: 5,
      } });
    expect(header.find('[className="header-text"]').text()).toBe('User 2');
  });
});
