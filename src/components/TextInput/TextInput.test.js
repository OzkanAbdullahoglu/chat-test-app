/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TextInput from './TextInput';
import { storeFactory } from '../../utils/testUtil';

describe('TextInput Component', () => {
  const store = storeFactory();
  const textInput = shallow(<TextInput store={store} />)
    .dive()
    .dive();
  it('renders without crashing', () => {
    expect(toJson(textInput)).toMatchSnapshot();
  });
});

describe('input changes on change', () => {
  it('it changes local state with on change event', () => {
    const store = storeFactory();
    const textInput = shallow(<TextInput store={store} />).dive().dive();
    textInput.find('input').simulate('change', { target: { value: 'test value' } });
    const inputValue = textInput.find('input').prop('value');
    expect(inputValue).toEqual('test value');
  });
});
