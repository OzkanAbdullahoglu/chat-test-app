/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Message from './Message';
import { storeFactory } from '../../utils/testUtil';


describe('Message Component', () => {
  const defaultProps = {
    pack: {
      id: 1,
      direction: 'in',
      status: 'read',
      timestamp: '1577834102',
      text: 'Alice was beginning',
      date: 'January 01,2020',
      time: '02:15',
      height: 45,
    },
  };
  const message = shallow(<Message {...defaultProps} />);

  it('renders without crashing', () => {
    expect(toJson(message)).toMatchSnapshot();
  });
  it('renders properly up to the `pack` prop', () => {
    expect(message.find('[className="time-inline"]').text()).toBe(defaultProps.pack.time);
    expect(message.find('[data-test="item-text"]').text()).toBe(defaultProps.pack.text);
  });
  it('renders conditionally up to the `pack.direction` and `pack.status` prop', () => {
    message.setProps({
      pack: {
        id: 1,
        direction: 'out',
        status: 'read',
        timestamp: '1577834102',
        text: 'Alice was beginning',
        date: 'January 01,2020',
        time: '02:15',
        height: 45,
      },
    });
    expect(message.find('[data-test="read-icon"]').exists()).toBe(true);
    const iconStyle = message.find('[data-test="read-icon"]').get(0).props.style;
    expect(iconStyle).toHaveProperty('color', 'blue');
  });
});
