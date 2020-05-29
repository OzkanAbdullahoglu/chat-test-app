/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { Wrapper } from './Wrapper';

describe('Wrapper', () => {
  const props = {
    incomingIcon: true,
    incomingAvatar: true,
    sendIcon: true,
    hideButton: true,
    scrollDown: true,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Wrapper {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });


  it('renders properly under default props', () => {
    const wrapper = shallow(<Wrapper {...props} />);
    expect(wrapper).toHaveStyleRule('height', '40px');
    expect(wrapper).toHaveStyleRule('width', '40px');
    expect(wrapper).toHaveStyleRule('background-color', '#fff');
    expect(wrapper).toHaveStyleRule('margin', '0 10px 0 0');
    expect(wrapper).toHaveStyleRule('position', 'absolute');
    expect(wrapper).toHaveStyleRule('cursor', 'pointer');
    expect(wrapper).toHaveStyleRule('opacity', '0');
    expect(wrapper).toHaveStyleRule('border', '1px solid #00bcd4');
    expect(wrapper).toHaveStyleRule('right', '0');
    expect(wrapper).toHaveStyleRule('bottom', '10px');
    expect(wrapper).toHaveStyleRule('top', '625px');
    expect(wrapper).toHaveStyleRule('left', '410px');
  });
  it('renders properly under custom props', () => {
    const customProps = {
      incomingIcon: false,
      incomingAvatar: false,
      sendIcon: false,
      hideButton: false,
      scrollDown: false,
    };
    const wrapper = shallow(<Wrapper {...customProps} />);
    expect(wrapper).toHaveStyleRule('height', '20px');
    expect(wrapper).toHaveStyleRule('width', '20px');
    expect(wrapper).toHaveStyleRule('background-color', '#00bcd4');
    expect(wrapper).toHaveStyleRule('margin', '0 7px 0 10px');
    expect(wrapper).toHaveStyleRule('position', 'relative');
    expect(wrapper).toHaveStyleRule('cursor', 'auto');
    expect(wrapper).toHaveStyleRule('opacity', '1');
    expect(wrapper).toHaveStyleRule('border', 'none');
    expect(wrapper).toHaveStyleRule('right', 'inherit');
    expect(wrapper).toHaveStyleRule('bottom', 'inherit');
    expect(wrapper).toHaveStyleRule('top', '0');
    expect(wrapper).toHaveStyleRule('left', 'inherit');
  });
});
