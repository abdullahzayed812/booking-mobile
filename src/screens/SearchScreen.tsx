
import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const SearchScreen = () => {
  return (
    <View>
      <Text>Search</Text>
      <TextInput placeholder="Search for patients, appointments, medical notes..." />
    </View>
  );
};

export default SearchScreen;
