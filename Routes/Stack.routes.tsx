import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "@/components/Login";
import Main from "@/components/Main";


const Stack = createStackNavigator();

export default function Route() {
  return (
      <Stack.Navigator initialRouteName="Main" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
