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
  TextInput,
  Alert,
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
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//styles
import styles from "./resumeScreen.style";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";
import ApiManager from "../../utils/userApi";

function ResumeScreen({ route }) {
  const { userInfo } = useContext(AuthContext);

  let relativeTime;

  const navigation = useNavigation();

  const [resume, setResume] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

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
      title: title,
      name: name,
      surname: surname,
      last_name: lastName,
      city: city,
      date_of_birtday: dateBirtday,
      phone: phone,
      nationality: nationality,
      experience: experience,
      education: education,
    };

    console.log(payload);
  };

  useEffect(() => {
    onResponse();
  }, []);

  const onResponse = () => {
    setLoading(true);
    ApiManager.get(`/api/resume/1/${route.params?.resumeid}`)
      .then((res) => {
        if (res.data) {
          setResume(res.data.data[0]);
          setLoading(false);
          // console.log(res.data.data);
        } else {
          alert("технические шокаладки3");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("resume:", error);
      });
  };

  const onDelete = () => {
    Alert.alert(
      "Вы уверены?",
      "Если вы удалите резюме, то все отклики, к которым вы прикрепили это резюме, также будут удалены!",
      [
        {
          text: "Отмена",
          onPress: () => setLoadingSpinner(false),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setLoadingSpinner(true);

            ApiManager.delete(`/api/resume/${resume.id}`)
              .then(() => {
                setLoadingSpinner(false);
                navigation.navigate("ProfileScreen");
                Toast.show({
                  type: "success",
                  text1: "Резюме было успешно удалено!",
                });
              })
              .catch((error) => {
                console.error("resume:", error);
                setLoadingSpinner(false);
              });
          },
        },
      ]
    );
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
          placeholder={!isFocus ? "Выберите образование" : "..."}
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
          placeholder={!isFocus ? "Выберите гражданство" : "..."}
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
      { label: "1 - 3", value: "3" },
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
          placeholder={!isFocus ? "Выберите опыт работы" : "..."}
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
      <Spinner visible={loadingSpinner} />

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
              width: 30,
            }}
          >
            <SvgBackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.rightBoxTopMenu}></View>
      </View>
      {!loading ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 15 }}
        >
          {/* MAIN INFO */}
          <View style={styles.wrapperPopularJobs}>
            <Text style={styles.titlePopularJobs}>Основная информация</Text>
            {/* cards */}
            <View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.name}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.surname}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.last_name}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.city}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {moment(resume.date_of_birtday).format("D MMMM YYYY")}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.phone}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.education}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.nationality}
                </Text>
              </View>
            </View>
          </View>

          {/* DOP INFO */}
          <View style={styles.wrapperPopularJobs}>
            <Text style={styles.titlePopularJobs}>Пожелания к работе</Text>
            {/* cards */}
            <View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {resume.title}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#a2a2a2",
                  paddingVertical: 6,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {`${resume.experience} ${
                    resume.experience === "без опыта" ? "" : "года"
                  }`}
                  {/* {resume.experience}  */}
                </Text>
              </View>
            </View>
          </View>

          {/* BUTTON edit*/}
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() =>
                navigation.push("EditResumeScreen", {
                  resumeid: resume.id,
                  resume: resume,
                })
              }
            >
              <View
                style={[
                  styles.backgroundBtnResponse,
                  { backgroundColor: "orange" },
                ]}
              >
                <Text style={styles.textBtn}>Редактировать резюме</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*  BUTTON delete*/}
          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity activeOpacity={0.4} onPress={() => onDelete()}>
              <View
                style={[
                  styles.backgroundBtnResponse,
                  { backgroundColor: "red" },
                ]}
              >
                <Text style={styles.textBtn}>Удалить резюме</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      )}
    </View>
  );
}

export default ResumeScreen;
