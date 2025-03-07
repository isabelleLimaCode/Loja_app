import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Stack.routes';
import Home from '@/components/Home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  const InternalDrawer = createDrawerNavigator();

  const InternalDrawerContent = () => (
    <InternalDrawer.Navigator>
      <InternalDrawer.Screen name="Inicio" component={StackNavigator} />
    </InternalDrawer.Navigator>
    );
  return (
    <Drawer.Navigator
      screenOptions={{
      drawerActiveBackgroundColor: '#B5C2B7', // Cor de fundo do botão ativo
      drawerActiveTintColor: '#000', // Cor do texto quando ativo
      drawerInactiveTintColor: '#333', // Cor do texto quando inativo
    }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Produtos" component={StackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
