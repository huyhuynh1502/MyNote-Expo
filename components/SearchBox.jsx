import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { View } from 'react-native-web';
import tw from 'twrnc';

const SearchBox = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    /**
     * Note: -> Room for better optimization with NOT using View
     */

    <View style={tw`bg-white`}> 
        <TextInput
        style={tw`mx-2 my-1 p-2 border border-white rounded rounded-3 bg-gray-200 text-lg`}
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={search}
        />
    </View>
  );
};

export default SearchBox;