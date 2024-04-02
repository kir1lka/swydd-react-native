//react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";

//navigate
import { useNavigation } from "@react-navigation/native";

//styles
import styles from "./tagsScreen.style";
import { COLORS } from "../../constants/color";

//components
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

function FilterScreen() {
  const navigation = useNavigation();

  //function
  const handleBackNavigate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
    </View>
  );
}

export default FilterScreen;
