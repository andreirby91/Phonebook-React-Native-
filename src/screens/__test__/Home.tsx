import React from 'react';
import renderer from 'react-test-renderer';

import {Home} from '../Home';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<Home name="World" enthusiasmLevel={1} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
