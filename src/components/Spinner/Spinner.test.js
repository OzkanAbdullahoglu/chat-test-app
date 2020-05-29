/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const spinner = shallow(<Spinner />);
    expect(toJson(spinner)).toMatchSnapshot();
  });
});
