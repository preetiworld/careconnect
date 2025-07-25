import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorList from '../screens/DoctorList';
import DoctorDetail from '../screens/DoctorDetail';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="DoctorList">
    <Stack.Screen name="DoctorList" component={DoctorList} options={{ title: 'Doctor List' }} />
    <Stack.Screen name="DoctorDetail" component={DoctorDetail} options={{ title: 'Doctor Detail' }} />
  </Stack.Navigator>
  </NavigationContainer>
  
);

export default StackNavigator;
