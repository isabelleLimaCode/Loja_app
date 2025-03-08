import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/components/Home';
import Dashboard from '@/components/Produto';
import Perfil from '@/components/Perfil';
import Header from '@/components/Header'; // Importando o Header
import Subscricao from '@/components/Subscricao';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />, 
        drawerActiveBackgroundColor: '#B5C2B7', // Cor de fundo do botão ativo
        drawerActiveTintColor: '#000', // Cor do texto quando ativo
        drawerInactiveTintColor: '#333', // Cor do texto quando inativo
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Produtos" component={Dashboard} options={{ headerShown: false }} />
      <Drawer.Screen name="Produtos subscritos" component={Subscricao} options={{ headerShown: false }} />
      <Drawer.Screen name="Definições" component={Perfil} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
