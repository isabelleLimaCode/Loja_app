// Route.tsx
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "@/components/Login";
import DrawerNavigator from "./Drawer.routes";
import testedb from "@/components/testedb";
import EditarProduto from "@/components/EditarProduto";
import Aut2F from "@/components/Aut2F";

// Definir o tipo Produto
type Produto = {
  produto_id: number;
  nome_produto: string;
  descricao: string;
  preco: number;
  estoque: number;
};

type RootStackParamList = {
  login: undefined;
  Main: undefined;
  test: undefined;
  aut:undefined;
  EditarProduto: { produto: Produto }; // Definir o tipo para EditarProduto
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Route() {
  return (
      <Stack.Navigator initialRouteName="login" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen 
        name="login" 
        component={Login} 
        options={{ headerShown: false }} 
        />

        <Stack.Screen 
        name="Main" 
        component={DrawerNavigator} 
        options={{ headerShown: false }} 
        />

        <Stack.Screen 
        name="aut"
        component={Aut2F} 
        options={{ headerShown: false }} 
        />

        <Stack.Screen 
        name="test" 
        component={testedb} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EditarProduto" 
          component={EditarProduto} 
          initialParams={{
            produto: { produto_id: 0, nome_produto: '', descricao: '', preco: 0, estoque: 0 }
          }} 
        />
      </Stack.Navigator>
  );
}
