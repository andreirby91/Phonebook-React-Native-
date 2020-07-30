import React from 'react';
import renderer from 'react-test-renderer';

import CountryCodeInputs from '../CountryCodeInputs';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(
      <CountryCodeInputs onCodeUpdate={() => {}} onCountryUpdate={() => {}} />,
    )
    .toJSON();
  expect(button).toMatchSnapshot();
});
