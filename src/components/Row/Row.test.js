/* eslint-disable linebreak-style */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Row from './Row';
import { storeFactory } from '../../utils/testUtil';

describe('Row Component', () => {
  const store = storeFactory();
  const mockFunc = jest.fn();
  const props = {
    index: 4,
    showTimeStampBool: mockFunc,
    updatedInitialData: [
      {
        id: 1,
        direction: 'in',
        status: 'read',
        timestamp: '1577834102',
        text: 'Alice was beginning',
      },
      {
        id: 2,
        direction: 'out',
        status: 'received',
        timestamp: '1577834168',
        text: 'to get very tired',
      },
      {
        id: 3,
        direction: 'in',
        status: 'read',
        timestamp: '1577834198',
        text: 'of sitting by her',
      },
      {
        id: 4,
        direction: 'in',
        status: 'read',
        timestamp: '1577834323',
        text: 'sister on the',
      },
      {
        id: 5,
        direction: 'in',
        status: 'read',
        timestamp: '1577834479',
        text: 'bank, and of having nothing to',
      },
    ],
  };
  const row = shallow(<Row store={store} {...props} />)
    .dive()
    .dive();
  it('renders without crashing', () => {
    expect(toJson(row)).toMatchSnapshot();
  });
});
