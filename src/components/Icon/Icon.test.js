/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import SvgIcon from './Icon';


describe('Icon', () => {
  const props = {
    incomingIcon: true,
    incomingAvatar: true,
    sendIcon: true,
    scrollDown: true,
  };

  it('renders without crashing', () => {
    const icon = shallow(<SvgIcon {...props} />);
    expect(toJson(icon)).toMatchSnapshot();
  });
  it('renders properly under default props', () => {
    const icon = shallow(<SvgIcon {...props} />);
    expect(icon).toHaveStyleRule('height', '1.5em');
    expect(icon).toHaveStyleRule('width', '1.5em');
    expect(icon).toHaveStyleRule('font-size', '1.5rem');
    expect(icon).toHaveStyleRule('color', '#00bcd4');
    expect(icon).toHaveStyleRule('margin-right', '0.1rem');
    expect(icon).toHaveStyleRule('position', 'absolute');
    expect(icon).toHaveStyleRule('transform', 'rotate(90deg)');
  });
  it('renders properly under custom props', () => {
    const customProps = {
      incomingIcon: false,
      incomingAvatar: false,
      sendIcon: false,
      scrollDown: false,
    };
    const icon = shallow(<SvgIcon {...customProps} />);
    expect(icon).toHaveStyleRule('height', '2em');
    expect(icon).toHaveStyleRule('width', '2em');
    expect(icon).toHaveStyleRule('font-size', '1rem');
    expect(icon).toHaveStyleRule('color', '#fff');
    expect(icon).toHaveStyleRule('margin-right', '0');
    expect(icon).toHaveStyleRule('position', 'relative');
    expect(icon).toHaveStyleRule('transform', 'rotate(0)');
  });
});

// still we have to do...
