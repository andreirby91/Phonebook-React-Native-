import React from 'react';
import {Text} from 'react-native';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import PrimaryButtonStory from './PrimaryButton';
import CenterView from './CenterView';
import Welcome from './Welcome';
import ContactItemStory from './ContactList/contactItem';
import SearchStory from './ContactList/search';
import EmptyContactListStory from './ContactList/emptyContactList';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('PrimaryButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <PrimaryButtonStory />);

storiesOf('ContactList/Item', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <ContactItemStory />);

storiesOf('ContactList/Search', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <SearchStory />);

storiesOf('ContactList/Empty', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <EmptyContactListStory />);
