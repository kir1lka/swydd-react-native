//react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";

//components
import { StatusBar } from "expo-status-bar";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//styles
import styles from "./buttonSL.style";

function ButtonSL({ textBT, navigateBT, onSubmit }) {
  const navigation = useNavigation();

  //functions
  const handleButtonPress = () => {
    navigation.navigate(navigateBT);
  };

  return (
    // onSubmit
    <TouchableOpacity onPress={onSubmit} activeOpacity={0.4}>
      <View style={styles.wrapper}>
        <Text style={styles.textBT}>{textBT}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonSL;
