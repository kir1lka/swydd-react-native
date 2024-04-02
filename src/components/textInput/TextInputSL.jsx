//react
import React, { useEffect, useRef, useState, valueInput } from "react";
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
import styles from "./textInputSL.style";

//svg
import SvgUser from "./../svg/logSign/SvgUser";
import SvgMail from "./../svg/logSign/SvgMail";
import SvgLock from "./../svg/logSign/SvgLock";

function TextInputSL({ imgIcon, textHolder, secureText, onChangeDate, error }) {
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //functions
  const handleTouchableOpacityClick = () => {
    textInputRef.current.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (text) => {
    setInputValue(text);
    onChangeDate(text);
  };

  return (
    <TouchableOpacity onPress={handleTouchableOpacityClick} activeOpacity={0.4}>
      <View style={{ alignItems: "center" }}>
        <View
          style={[
            styles.wrapperTextInput,
            isFocused && styles.focusedTextInput,
            error && styles.errorTextInput,
          ]}
        >
          {imgIcon === "user" ? (
            <SvgUser />
          ) : imgIcon === "mail" ? (
            <SvgMail />
          ) : imgIcon === "lock" ? (
            <SvgLock />
          ) : (
            ""
          )}
          <TextInput
            returnKeyType="next"
            ref={textInputRef}
            // ref={ref}
            secureTextEntry={secureText}
            placeholder={textHolder}
            placeholderTextColor="#8c8c8c"
            style={styles.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={inputValue}
            onChangeText={handleChange}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TextInputSL;
