import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";


const Stack = createStackNavigator();

export default function Route() {
  return (
      <Stack.Navigator initialRouteName="login" screenOptions={{ gestureEnabled: false }}>
       <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Dashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
