//react
import React, { useEffect, useRef, useState } from "react";
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

//styles
import styles from "./searchInput.style";

//svg
import SvgSearch from "./../../components/svg/tabNavigate/SvgSearch";

function SearchInput({
  textHolder,
  navigate,
  valueText,
  searchValue,
  onSearchInput,
  enterSearch,
}) {
  const textInputRef = useRef(null);

  //functions
  const handleTouchableOpacityClick = () => {
    textInputRef.current.focus();
  };

  const handleSearch = (text) => {
    onSearchInput(text);
  };

  return navigate ? (
    <TouchableOpacity onPress={navigate} activeOpacity={0.4}>
      <View style={styles.wrapperTextInput}>
        <SvgSearch color="#8c8c8c" />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flex: 1,
            marginHorizontal: 10,
            fontSize: 18,
            color: "#8c8c8c",
          }}
        >
          {textHolder}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={handleTouchableOpacityClick} activeOpacity={0.4}>
      <View style={styles.wrapperTextInput}>
        <SvgSearch color="#8c8c8c" />
        <TextInput
          ref={textInputRef}
          placeholder={textHolder}
          clearButtonMode="always"
          placeholderTextColor="#8c8c8c"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={() => enterSearch()}
          autoFocus={true}
          style={{
            flex: 1,
            marginHorizontal: 10,
            fontSize: 18,
            color: "black",
          }}
          value={searchValue}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
    </TouchableOpacity>
  );
}

export default SearchInput;
