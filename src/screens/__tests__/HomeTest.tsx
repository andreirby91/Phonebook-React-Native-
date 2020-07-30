import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../Home';
import {NavigationContainer} from '@react-navigation/native';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(
      <NavigationContainer>
        <Home />
      </NavigationContainer>,
    )
    .toJSON();
  expect(button).toMatchSnapshot();
});
