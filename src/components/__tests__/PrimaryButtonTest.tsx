import React from 'react';
import renderer from 'react-test-renderer';

import PrimaryButton from '../PrimaryButton';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<PrimaryButton title="Button" onPress={() => {}} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
