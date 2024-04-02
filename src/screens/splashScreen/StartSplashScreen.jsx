//react
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//Animatable
import * as Animatable from "react-native-animatable";

//style
import styles from "./startSplashScreen.style";

//img
import SvgLogo from "../../components/svg/SvgLogo";

function StartSplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* logo */}
      <Animatable.View animation="fadeIn" duration={1000}>
        <SvgLogo />
      </Animatable.View>

      {/* indicator */}
      <Animatable.View animation="fadeIn" duration={3000}>
        <ActivityIndicator style={{ marginTop: 15 }} size="large" />
      </Animatable.View>
    </View>
  );
}

export default StartSplashScreen;
