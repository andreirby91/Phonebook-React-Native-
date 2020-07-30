import React from 'react';
import renderer from 'react-test-renderer';

import Search from '../Search';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<Search searchValue="" onChangeText={() => {}} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
