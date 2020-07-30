import React from 'react';
import renderer from 'react-test-renderer';

import ContactItem from '../ContactItem';

it('renders correctly with defaults', () => {
  const name = 'Andrei Beraru';
  const sex = 'Male';
  const phone = '0763111111';
  const country = 'Romania';
  const code = '40';

  const button = renderer
    .create(
      <ContactItem
        name={name}
        sex={sex}
        phone={phone}
        country={country}
        code={code}
        onRightPress={() => {}}
      />,
    )
    .toJSON();
  expect(button).toMatchSnapshot();
});
