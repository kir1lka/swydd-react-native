//react
import React from "react";

//stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//components
import OnBoardingScreen from "../screens/onBoardingScreen/OnBoardingScreen";
import AppNavigate from "./AppNavigate";

function StackOnboardingNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardingScreen"
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
        name="AppNavigate"
        component={AppNavigate}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackOnboardingNavigation;
