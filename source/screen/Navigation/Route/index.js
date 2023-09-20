import React from 'react';
import {View, Text} from 'react-native';
import StackNavigation from '../StackNavigation';
import {NavigationContainer} from '@react-navigation/native';

const Route = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default Route;
