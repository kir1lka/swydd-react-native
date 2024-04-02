import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//components
import TextInputSL from "../../components/textInput/TextInputSL";
import ButtonSL from "../../components/buttonSL/ButtonSL";
import axios from "axios";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import ApiManager from "../../utils/userApi";
import { AuthContext } from "../../context/AuthContext";
import { setItem } from "../../utils/asyncStorage";
import Animated from "react-native-reanimated";

//styles
import styles from "./loginScreen.style";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";

function LogInSceen() {
  const navigation = useNavigation();

  const { setValue, register, handleSubmit } = useForm();

  const [titleError, setTitleError] = useState(null);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const valueAuthContext = useContext(AuthContext);
  const { isLoading, loginContext, errorMessages, lastScreen } =
    useContext(AuthContext);

  //
  //functions
  //
  const handleSignUp = () => {
    navigation.navigate("SignUpSceen");
  };

  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const onSubmit = async (formData) => {
    setIsEmailError(false);
    setIsPasswordError(false);

    await loginContext(formData);
  };

  useEffect(() => {
    setIsEmailError(false);
    setIsPasswordError(false);
    setEmailError("");
    setPasswordError("");

    if (lastScreen === "LogInSceen") {
      let errors = [];

      if (errorMessages && errorMessages.email) {
        setIsEmailError(true);
        setEmailError(`* ${errorMessages.email}`);
        // errors.push(`* ${errorMessages.email}`);
      }
      if (errorMessages && errorMessages.password) {
        setIsPasswordError(true);
        setPasswordError(`* ${errorMessages.password}`);
        // errors.push(`* ${errorMessages.password}`);
      }
      if (
        (errorMessages &&
          errorMessages.email === null &&
          errorMessages.password === null) ||
        typeof errorMessages !== "object"
      ) {
        setIsEmailError(true);
        setIsPasswordError(true);
        errors.push(`* ${errorMessages}`);
      }
      setTitleError(errors.join("\n"));
    } else {
      setTitleError(null);
    }
  }, [errorMessages, lastScreen]);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <View style={styles.containerForm}>
      <StatusBar style="dark" />

      {/* loading */}
      <Spinner visible={isLoading} />

      {/* TopNavigate */}
      <View style={styles.wrapperTopNavigate}>
        <TouchableOpacity
          onPress={handleBackNavigate}
          activeOpacity={0.4}
          style={{
            paddingVertical: 5,
            paddingRight: 25,
          }}
        >
          <SvgBackArrow />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* 
          // TITLE
          */}
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>Авторизация</Text>
              <Text style={styles.textUnderTitle}>Вход в систему</Text>
            </View>

            {/* 
          // INPUTS TEXT
          */}

            <View style={styles.wrapperInput}>
              <TextInputSL
                imgIcon="mail"
                textHolder={"Введите почту"}
                onChangeDate={(text) => setValue("email", text)}
                error={isEmailError}
              />

              {emailError !== "" ? (
                <Text style={styles.titleError}>{emailError}</Text>
              ) : (
                <Text></Text>
              )}

              <TextInputSL
                imgIcon="lock"
                textHolder={"Введите пароль"}
                secureText={true}
                onChangeDate={(text) => setValue("password", text)}
                error={isPasswordError}
              />

              {passwordError !== "" ? (
                <Text style={styles.titleError}>{passwordError}</Text>
              ) : (
                <Text></Text>
              )}

              {/* <View style={styles.wrapperForgot}>
                <Text style={styles.textForgot}>Забыли пароль?</Text>
              </View> */}

              <ButtonSL textBT={"Войти"} onSubmit={handleSubmit(onSubmit)} />

              <Text style={styles.mainTitleError}>{titleError}</Text>
            </View>

            {/* */}
            {/* <View style={{ flex: 1 }}></View> */}
            {/* */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* 
          // NAVIGATE IN SIGNUP
          */}
      <View>
        <View style={styles.wrapperBottomNavigate}>
          <Text style={styles.textBottomNavigate}>Нет аккаунта?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.linkBottomNavigate}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LogInSceen;
