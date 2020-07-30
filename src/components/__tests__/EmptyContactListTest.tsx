import React from 'react';
import renderer from 'react-test-renderer';

import EmptyContactList from '../EmptyContactList';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<EmptyContactList onPress={() => {}} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
