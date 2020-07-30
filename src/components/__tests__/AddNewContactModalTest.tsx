import React from 'react';
import renderer from 'react-test-renderer';

import AddNewContactModal from '../AddNewContactModal';

it('renders correctly with defaults', () => {
  const button = renderer.create(<AddNewContactModal />).toJSON();
  expect(button).toMatchSnapshot();
});
