import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stack.routes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Produtos" component={StackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
