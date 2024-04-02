import React, { useContext, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Platform,
} from "react-native";

//components
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaskedTextInput } from "react-native-mask-text";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//styles
import styles from "./createResume.style";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";
import ApiManager from "../../utils/userApi";

function CreateResumeScreen() {
  const { userInfo } = useContext(AuthContext);
  const [errors, setErrors] = useState(null);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  //ref
  const nameRef = useRef();
  const surnameRef = useRef();
  const lastNameRef = useRef();
  const cityRef = useRef();
  const dateBirtdayRef = useRef();
  const phoneRef = useRef();
  const nationalityRef = useRef();
  const educationRef = useRef();
  const titleRef = useRef();
  const experienceRef = useRef();

  //form
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [dateBirtday, setDateBirtday] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  //function
  const onSubmit = () => {
    const payload = {
      title: title || "",
      name: name || "",
      surname: surname || "",
      last_name: lastName || "",
      city: city || "",
      date_of_birtday: dateBirtday || "",
      phone: phone || "",
      nationality: nationality || "",
      experience: experience || "",
      education: education || "",
    };

    // console.log(payload);
    setLoading(true);
    ApiManager.post(`/api/resume/add/${userInfo.user?.id}`, payload)
      .then((res) => {
        if (res.data) {
          setLoading(false);
          navigation.navigate("ProfileScreen");

          Toast.show({
            type: "success",
            text1: "Резюме было создано!",
          });

          // console.log(res.data);
        } else {
          // console.log(res.data);
          setLoading(false);
          // alert("технические шокаладки3");
        }
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.status === 422) {
          setErrors(err.response.data.errors);
        }
        setLoading(false);
      });
  };

  //components
  const DropdownEducation = ({ setEducation, education }) => {
    const data = [
      { label: "Еще учусь", value: "1" },
      { label: "Среднее общее", value: "2" },
      { label: "Среднее специальное", value: "3" },
      { label: "Высшее", value: "4" },
    ];

    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.DropdownBack}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: COLORS.main }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder={
            !isFocus && !education
              ? "Выберите образование"
              : education
              ? education
              : "..."
          }
          // value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={education}
          onChange={(item) => setEducation(item.label)}
        />
      </View>
    );
  };

  const DropdownNationality = ({ setNationality, nationality }) => {
    const data = [
      { label: "Россия", value: "1" },
      { label: "Казанстан", value: "1" },
      { label: "Монголия", value: "1" },
      { label: "Белоруссия", value: "1" },
      { label: "Кыргызстан", value: "1" },
      { label: "Другое", value: "2" },
    ];

    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.DropdownBack}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: COLORS.main }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder={
            !isFocus && !nationality
              ? "Выберите образование"
              : nationality
              ? nationality
              : "..."
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={nationality}
          onChange={(item) => {
            setNationality(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  const DropdownExperience = ({ experience, setExperience }) => {
    const data = [
      { label: "без опыта", value: "1" },
      { label: "1 - 2", value: "2" },
      { label: "3 - 4", value: "3" },
    ];

    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.DropdownBack}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: COLORS.main }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder={
            !isFocus && !experience
              ? "Выберите образование"
              : experience
              ? experience
              : "..."
          }
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={experience}
          onChange={(item) => {
            setExperience(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* loading */}
      <Spinner visible={loading} />

      {/* TOP_MENU */}
      <View style={styles.wrapperTopMenu}>
        {/* left */}
        <View style={styles.leftBoxTopMenu}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.4}
            style={{
              paddingVertical: 5,
              paddingRight: 25,
              // backgroundColor: "red",
              width: 30,
            }}
          >
            <SvgBackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.rightBoxTopMenu}></View>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 15 }}
      >
        {/* MAIN INFO */}
        <View style={[styles.wrapperPopularJobs, { marginBottom: 100 }]}>
          <KeyboardAwareScrollView
            // style={{ flex: 1 }}
            // keyboardVerticalOffset={60}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardShouldPersistTaps="handled"
            // behavior={"position"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <Text style={styles.titlePopularJobs}>Основная информация</Text>
                {/* info */}
                <View>
                  <TextInput
                    ref={nameRef}
                    placeholder="Имя"
                    placeholderTextColor="#a2a2a2"
                    clearButtonMode="always"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => surnameRef.current.focus()}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                    onChangeText={(text) => setName(text)}
                    value={name}
                  />

                  <TextInput
                    ref={surnameRef}
                    placeholder="Фамилия"
                    placeholderTextColor="#a2a2a2"
                    clearButtonMode="always"
                    returnKeyType="next"
                    onSubmitEditing={() => lastNameRef.current.focus()}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                    onChangeText={(text) => setSurname(text)}
                    value={surname}
                  />
                  <TextInput
                    ref={lastNameRef}
                    placeholder="Отчество"
                    placeholderTextColor="#a2a2a2"
                    clearButtonMode="always"
                    returnKeyType="next"
                    onSubmitEditing={() => cityRef.current.focus()}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                  />
                  <TextInput
                    ref={cityRef}
                    placeholder="Город"
                    placeholderTextColor="#a2a2a2"
                    clearButtonMode="always"
                    returnKeyType="next"
                    onSubmitEditing={() => dateBirtdayRef.current.focus()}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                    onChangeText={(text) => setCity(text)}
                    value={city}
                  />

                  <MaskedTextInput
                    ref={dateBirtdayRef}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneRef.current.focus()}
                    type="date"
                    options={{
                      dateFormat: "DD-MM-YYYY",
                    }}
                    clearButtonMode="always"
                    mask="99/99/9999"
                    onChangeText={(text, rawText) => {
                      setDateBirtday(text);
                      // console.log(text); // Отформатированный текст с маской
                      //  console.log(rawText); // Текст без форматирования (без маски)
                    }}
                    keyboardType="numeric"
                    placeholder="Год рождения (д/м/г)"
                    placeholderTextColor="#a2a2a2"
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                  />

                  <MaskedTextInput
                    ref={phoneRef}
                    returnKeyType="next"
                    onSubmitEditing={() => titleRef.current.focus()}
                    clearButtonMode="always"
                    placeholder="Номер телефона"
                    placeholderTextColor="#a2a2a2"
                    mask="+9 (999) 999-99-99"
                    keyboardType="numeric"
                    onChangeText={(text, rawText) => {
                      setPhone(text);
                      // console.log(text); // Отформатированный текст с маской
                      //  console.log(rawText); // Текст без форматирования (без маски)
                    }}
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                  />

                  <DropdownEducation
                    education={education}
                    setEducation={setEducation}
                  />

                  <DropdownNationality
                    nationality={nationality}
                    setNationality={setNationality}
                  />

                  <Text style={styles.titlePopularJobs}>
                    Пожелания к работе
                  </Text>
                  <TextInput
                    ref={titleRef}
                    placeholder="Желаемая должность"
                    placeholderTextColor="#a2a2a2"
                    clearButtonMode="always"
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#a2a2a2",
                      paddingVertical: 6,
                      marginBottom: 15,
                      fontSize: 18,
                    }}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                  />
                  <DropdownExperience
                    experience={experience}
                    setExperience={setExperience}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {errors && (
              <View
                style={{
                  padding: 16,
                  backgroundColor: "#ff4040",
                  color: "white",
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {Object.keys(errors).map((key) => (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                    }}
                    key={key}
                  >
                    * {errors[key][0]}
                  </Text>
                ))}
              </View>
            )}

            {/* BUTTON */}
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity activeOpacity={0.4} onPress={() => onSubmit()}>
                <View style={styles.backgroundBtnResponse}>
                  <Text style={styles.textBtn}>Сохранить резюме</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

export default CreateResumeScreen;
