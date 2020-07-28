import React, {useState} from 'react';
import Search from '../../../src/components/Search';

const SearchStory = () => {
  const [value, setValue] = useState('');
  return (
    <Search
      searchValue={value}
      onChangeText={(text: string) => setValue(text)}
    />
  );
};

export default SearchStory;
