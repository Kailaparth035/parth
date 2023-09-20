import React from 'react';
import {View, Text} from 'react-native';
import Login from '../../AuthScreen/Login';
import SignUp from '../../AuthScreen/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import GlobalInclude from '../../../globalInclude/GlobalInclude';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={GlobalInclude.ScreenName.Login}>
      <Stack.Screen name={GlobalInclude.ScreenName.Login} component={Login} />
      <Stack.Screen name={GlobalInclude.ScreenName.SignUp} component={SignUp} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
