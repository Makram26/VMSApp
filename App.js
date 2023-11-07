import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Lodin';
import Home from './src/Screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" options={{title:"VMS",headerBackVisible:false,headerTitleStyle:{color:"white",fontWeight:"700"},headerStyle:{backgroundColor:"#505762"}}}  component={Home} />
      <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;