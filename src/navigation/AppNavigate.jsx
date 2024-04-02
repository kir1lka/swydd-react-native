//react
import React, { useContext, useEffect, useState } from "react";

//components
import { AuthContext } from "../context/AuthContext";
import TabNavigation from "./TabNavigation";
import StackAuthNavigation from "./StackAuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartSplashScreen from "../screens/splashScreen/StartSplashScreen";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function AppNavigate() {
  const navigation = useNavigation();
  const { userInfo, isLoadingStartSplashScreen } = useContext(AuthContext);

  if (isLoadingStartSplashScreen) {
    return <StartSplashScreen />;
  }

  // if (userInfo) {
  //   return <TabNavigation />;
  // } else {
  //   return <StackAuthNavigation />;
  // }

  return (
    <>
      {userInfo && <TabNavigation />}
      {!userInfo && <StackAuthNavigation />}
    </>
  );
}

export default AppNavigate;
