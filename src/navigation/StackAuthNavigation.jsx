//react
import React, { useContext, useEffect } from "react";

//stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//components
import LogInSceen from "../screens/loginInScreen/LogInSceen";
import SignUpSceen from "../screens/signUpScreen/SignUpScreen";
import StackNavigation from "./StackNavigation";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function StackAuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SignUpSceen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SignUpSceen"
        component={SignUpSceen}
        options={{
          animation: "fade",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="LogInSceen"
        component={LogInSceen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{
          animation: "fade",

          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default StackAuthNavigation;

// return (
//   <Stack.Navigator
//     initialRouteName="SignUpSceen"
//     screenOptions={{ headerShown: false }}
//   >
//     <Stack.Screen
//       name="StackNavigation"
//       component={StackNavigation}
//       options={{
//         headerShown: false,
//         title: "",
//         gestureEnabled: false,
//         headerShadowVisible: false,
//         headerBackVisible: false,
//         headerRight: () => {},
//       }}
//     />
//     <Stack.Screen
//       name="SignUpSceen"
//       component={SignUpSceen}
//       options={{
//         headerShown: false,
//         title: "",
//         gestureEnabled: false,
//         headerShadowVisible: false,
//         headerBackVisible: false,
//         headerRight: () => {},
//       }}
//     />
//     <Stack.Screen
//       name="LogInSceen"
//       component={LogInSceen}
//       options={{
//         headerShown: false,
//         title: "",
//         headerShadowVisible: false,
//         headerTintColor: "#000",
//       }}
//     />
//   </Stack.Navigator>
// );
// }
