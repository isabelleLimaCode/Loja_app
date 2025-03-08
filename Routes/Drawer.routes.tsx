import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/components/Home';
import Dashboard from '@/components/Produto';
import Perfil from '@/components/Perfil';
import Subscricao from '@/components/Subscricao';
import { Ionicons } from '@expo/vector-icons'; // Importando os ícones do Expo

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#B5C2B7', // Cor de fundo do botão ativo
        drawerActiveTintColor: '#000', // Cor do texto quando ativo
        drawerInactiveTintColor: '#333', // Cor do texto quando inativo
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Produtos"
        component={Dashboard}
        options={{
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Produtos subscritos"
        component={Subscricao}
        options={{
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Definições"
        component={Perfil}
        options={{
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
