# Phonebook app

Created in React Native + typescript.

## Usage

### Storybook mode

In order to run the app in Storybook mode you need to export in App.tsx:

```bash
export default from './storybook';
```

then run the following commands

```bash
$ yarn start
$ yarn storkybook
For IOS: $ yarn ios
For Android $ yarn android
```

### App mode

In order to run the app you need to make sure that you have the correct default export in App.tsx:

```bash
export default from './storybook';
```

then run the following commands

```bash
$ yarn start
For IOS: $ yarn ios
For Android $ yarn android
```

### App functions

- Add contact (by pressing the + btn or Add contact btn)
- Remove contact (swipe right and the delete will appear)
- Filter contact list by name & phone number
- Contact list is sorted alphabetically
- Add contact form
- Add contact form validation (all fields)
- Add contact form search country filter
- Add contact form input types for country and code if fetching data is not available
- Save contacts and countries data in phone storage.
- Snapshot tests

## License

[MIT](https://choosealicense.com/licenses/mit/)
