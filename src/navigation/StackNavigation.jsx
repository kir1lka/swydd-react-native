//react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//components
import OnBoardingScreen from "../screens/onBoardingScreen/OnBoardingScreen";
import FilterSreen from "../screens/filterScreen/FilterScreen";

//navigation
import TabNavigation from "./TabNavigation";
import ChatResponseScreen from "../screens/chatResponseScreen/ChatResponseScreen";

function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      {/* <Stack.Screen
        name="ChatResponseScreen"
        component={ChatResponseScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default StackNavigation;
