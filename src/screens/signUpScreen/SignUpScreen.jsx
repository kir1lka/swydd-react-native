//react
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";

//components
import { StatusBar } from "expo-status-bar";
import TextInputSL from "../../components/textInput/TextInputSL";
import ButtonSL from "../../components/buttonSL/ButtonSL";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiManager from "../../utils/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";

//styles
import styles from "./signUpScreen.style";

function SignUpScreen() {
  //ref
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigation = useNavigation();

  const { setValue, register, handleSubmit } = useForm();

  const [titleError, setTitleError] = useState([]);
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const valueAuthContext = useContext(AuthContext);
  const { isLoading, registerContext, errorMessages, lastScreen } =
    useContext(AuthContext);

  // useEffect
  useEffect(() => {
    setIsNameError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let errors = [];
    console.log(lastScreen);
    if (lastScreen === "SignUpScreen") {
      if (errorMessages && errorMessages.name) {
        setIsNameError(true);
        setNameError(`* ${errorMessages.name}`);
        errors.push(`* ${errorMessages.name}`);
      }

      if (errorMessages && errorMessages.email) {
        setIsEmailError(true);
        setEmailError(`* ${errorMessages.email}`);
        errors.push(`* ${errorMessages.email}`);
      }

      if (errorMessages && errorMessages.password) {
        setIsPasswordError(true);
        setPasswordError(`* ${errorMessages.password}`);
        errors.push(`* ${errorMessages.password}`);
      }

      setTitleError(errors.join("\n"));
      // setTitleError(errors[0]);
      console.log(`console ${errors}`);
    } else {
      setTitleError(null);
    }
  }, [errorMessages, lastScreen]);

  useEffect(() => {
    register("name");
    register("email");
    register("password");
  }, [register]);

  //functions
  const handleSignUp = () => {
    navigation.navigate("LogInSceen");
  };

  const onSubmit = async (formData) => {
    await registerContext(formData);
  };

  const handleSubmitEditing = (ref) => {
    ref.current.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* loading */}
      <Spinner visible={isLoading} />

      {/* 
      // TITLE
      */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        // keyboardVerticalOffset={-60}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.wrapperTitle}>
              <Text style={styles.title}>Регистрация</Text>
              <Text style={styles.textUnderTitle}>
                Создание нового аккаунта
              </Text>
            </View>
            {/* 
          // INPUTS TEXT
          */}
            <View style={styles.wrapperTextInput}>
              {/* marginBottom: 20 + 20 c  TextInputSL*/}
              <View style={{ marginBottom: 20 }}>
                <TextInputSL
                  imgIcon="user"
                  textHolder={"Введите логин"}
                  onChangeDate={(text) => {
                    setValue("name", text);
                  }}
                  error={isNameError}
                />

                {nameError !== "" ? (
                  <Text style={styles.titleError}>{nameError}</Text>
                ) : (
                  <Text></Text>
                )}

                <TextInputSL
                  imgIcon="mail"
                  textHolder={"Введите почту"}
                  onChangeDate={(text) => {
                    setValue("email", text);
                  }}
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
                  onChangeDate={(text) => {
                    setValue("password", text);
                  }}
                  error={isPasswordError}
                />

                {passwordError !== "" ? (
                  <Text style={styles.titleError}>{passwordError}</Text>
                ) : (
                  <Text></Text>
                )}
              </View>

              <ButtonSL
                textBT={"Регистрация"}
                onSubmit={handleSubmit(onSubmit)}
              />

              {/* <Text style={styles.titleError}>{titleError}</Text> */}
            </View>

            {/* / */}
            {/* <View style={{ flex: 1 }}></View> */}
            {/* / */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* 
      // NAVIGATE IN LOGIN
      */}
      <View style={styles.wrapperBottomNavigate}>
        <Text style={styles.textBottomNavigate}>Уже есть аккаунт?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.linkBottomNavigate}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUpScreen;
