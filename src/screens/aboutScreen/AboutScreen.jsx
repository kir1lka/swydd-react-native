//react
import React, { useEffect, useState, useContext, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

//components
import { useNavigation } from "@react-navigation/native";

function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 100 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>НАЗАД</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AboutScreen;
