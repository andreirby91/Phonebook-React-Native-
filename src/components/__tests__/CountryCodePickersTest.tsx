import React from 'react';
import renderer from 'react-test-renderer';

import CountryCodePickers from '../CountryCodePickers';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(
      <CountryCodePickers onCodeUpdate={() => {}} onCountryUpdate={() => {}} />,
    )
    .toJSON();
  expect(button).toMatchSnapshot();
});
