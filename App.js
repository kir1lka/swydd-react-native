//react
import React, { useState, useEffect, useCallback, useContext } from "react";

import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//navigate
import { NavigationContainer } from "@react-navigation/native";

//components
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import StackOnboardingNavigation from "./src/navigation/StackOnboardingNavigation";
import StartSplashScreen from "./src/screens/splashScreen/StartSplashScreen";
import StackAuthNavigation from "./src/navigation/StackAuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import AppNavigate from "./src/navigation/AppNavigate";
import TabNavigation from "./src/navigation/TabNavigation";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS } from "./src/constants/color";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://c30b91118d4fac1c3fca8b9c72362bf3@o4507028053426176.ingest.us.sentry.io/4507028054999045",
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showOnBoarding, setShowOnBoarding] = useState(null);

  const checkIfAlreadyOnBoarding = async () => {
    let onBoarded = await AsyncStorage.getItem("onboarded");
    if (onBoarded == 1) {
      setShowOnBoarding(false);
    } else {
      setShowOnBoarding(true);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Загрузка шрифтов
        await Font.loadAsync({
          MontserratLogo: require("./assets/fonts/Montserrat/Montserrat-ExtraBold.ttf"),
          MontserratExtraBold: require("./assets/fonts/Montserrat/Montserrat-ExtraBold.ttf"),
          MontserratBold: require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
          MontserratSemiBold: require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
          PoppinsTitle: require("./assets/fonts/Popins/Poppins-Bold.ttf"),
          PoppinsSemiBold: require("./assets/fonts/Popins/Poppins-SemiBold.ttf"),
          PoppinsMedium: require("./assets/fonts/Popins/Poppins-Medium.ttf"),
          PoppinsText: require("./assets/fonts/Popins/Poppins-Regular.ttf"),
        });

        // let storedUserInfo = await AsyncStorage.getItem("userInfo");
        // storedUserInfo = JSON.parse(storedUserInfo);
        // setUserInfo(storedUserInfo);

        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
    checkIfAlreadyOnBoarding();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <StartSplashScreen />;
  }

  //
  // onboardingCheck
  //

  // if (showOnBoarding == null) {
  //   return null;
  // }

  // if (showOnBoarding) {
  //   return (
  //     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
  //       <AuthProvider>
  //         <NavigationContainer>
  //           <StackOnboardingNavigation />
  //         </NavigationContainer>
  //       </AuthProvider>
  //     </View>
  //   );
  // } else {
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigate />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}
// }

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.main, width: "93%" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: "MontserratSemiBold",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
