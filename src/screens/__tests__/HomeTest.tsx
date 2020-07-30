import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../Home';

it('renders correctly with defaults', () => {
  const button = renderer.create(<Home />).toJSON();
  expect(button).toMatchSnapshot();
});
