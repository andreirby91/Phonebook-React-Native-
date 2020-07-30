import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';

import PrimaryButtonStory from './PrimaryButton';
import CenterView from './CenterView';
import Welcome from './Welcome';
import ContactItemStory from './ContactList/contactItem';
import SearchStory from './ContactList/search';
import EmptyContactListStory from './ContactList/emptyContactList';
import CountryCodePickersStory from './Form/countryCodePickers';
import CountryCodeInputsStory from './Form/countryCodeInputs';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('PrimaryButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <PrimaryButtonStory title="Primary Button" />)
  .add('withIcon', () => <PrimaryButtonStory hasIcon={true} />);

storiesOf('ContactList/Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <ContactItemStory />);

storiesOf('ContactList/Search', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <SearchStory />);

storiesOf('ContactList/Empty', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <EmptyContactListStory />);

storiesOf('Form/CountryCode Inputs', module).add('Default', () => (
  <CountryCodeInputsStory />
));

storiesOf('Form/CountryCode Pickers', module).add('Default', () => (
  <CountryCodePickersStory />
));
