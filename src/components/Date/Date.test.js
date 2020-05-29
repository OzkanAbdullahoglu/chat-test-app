/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Date from './Date';

describe('Date', () => {
  const props = {
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

  it('renders without crashing', () => {
    const date = shallow(<Date {...props} />);
    expect(toJson(date)).toMatchSnapshot();
  });
  it('renders proper date from props', () => {
    const date = shallow(<Date {...props} />);
    expect(date.find('span').text()).toBe(props.pack.date);
  });
});
