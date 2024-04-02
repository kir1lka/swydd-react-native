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
import { StatusBar } from "expo-status-bar";
import PopularCardJob from "../../components/popularCardJob/PopularCardJob";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import ButtonSL from "./../../components/buttonSL/ButtonSL";
import axios from "axios";
import JobCard from "../../components/jobCard/JobCard";
import ApiManager from "../../utils/userApi";
import SearchInput from "../../components/searchInput/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "./../../constants/color";
import Spinner from "react-native-loading-spinner-overlay";
import { Dropdown } from "react-native-element-dropdown";
import SkeletonJobCard from "../../components/jobCard/SkeletonJobCard";
import ResumeCard from "../../components/resumeCard/ResumeCard";

//styles
import styles from "./profileScreen.style";

//svg
import SvgFilter from "./../../components/svg/filter/SvgFilter";
import SvgBackArrow from "../../components/svg/SvgBackArrow";
import SvgSearch from "../../components/svg/tabNavigate/SvgSearch";
import SvgFavoriteDetails from "./../../components/svg/jobDetails/SvgFavoriteDetails";
import SvgMenu from "./../../components/svg/SvgMenu";
import SvgSetting from "./../../components/svg/SvgSetting";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const data = [
  { label: "Активно ищу работу", value: "1" },
  { label: "Нашел работу", value: "2" },
  { label: "Не ищу работу", value: "3" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
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
        valueField="value"
        placeholder={!isFocus ? "Выберите активность" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

function ProfileScreen({ route }) {
  const [isErrorView, setErrorView] = useState(false);

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  //resume
  const [resumesLoading, setResumesLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  const { userInfo, isLoading, logoutContext } = useContext(AuthContext);

  useEffect(() => {
    onResponse();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ApiManager.get(`/api/resume/${userInfo.user?.id}`)
        .then((res) => {
          if (res.data) {
            setResumes(res.data);
          } else {
            // alert("технические шокаладки3");
            setResumesLoading(true);
          }
        })
        .catch((error) => {
          // console.error("resume:", error);
          setErrorView(true);
        });
    }, [])
  );

  //functions

  const onResponse = () => {
    setResumesLoading(false);

    ApiManager.get(`/api/resume/${userInfo.user?.id}`)
      .then((res) => {
        if (res.data) {
          setResumes(res.data);
          setResumesLoading(true);
        } else {
          // alert("технические шокаладки3");
          setErrorView(true);
          setResumesLoading(true);
        }
      })
      .catch((error) => {
        // console.error("resume:", error);
        setErrorView(true);
        setResumesLoading(true);
      });

    setRefreshing(false);
  };

  const logout = () => {
    // AsyncStorage.removeItem("userInfo");
    logoutContext();
  };

  const onboardingDelete = () => {
    AsyncStorage.removeItem("onboarded");
  };

  const onRefresh = () => {
    setRefreshing(true);
    onResponse();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Spinner visible={isLoading} />

      {/* TOP_MENU */}
      <View style={styles.wrapperTopNavigate}>
        <View style={styles.rightBoxTopMenu}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <View style={styles.backgroundSvgFavorite}>
              <SvgSetting color={"#000"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* LOGO AND USER INFO */}
      <View style={styles.wrapperDetailsLogoJob}>
        {/* left */}
        <View>
          <View style={styles.boxLogo}>
            {/* {jobCardDate.logo !== null ? (
                <Image
                  source={{
                    uri: jobCardDate.logo,
                  }}
                  style={styles.logoCompany}
                />
              ) : ( */}
            <View style={styles.logoCompanyNull}>
              <Text style={styles.textCompanyNull}>
                {userInfo.user.name.slice(0, 1)}
              </Text>
            </View>
            {/* )} */}
          </View>
        </View>

        {/* right */}
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "MontserratBold",
              marginBottom: 5,
            }}
          >
            {userInfo.user.name}
          </Text>
          <Text
            style={{ fontSize: 18, fontFamily: "PoppinsText", marginBottom: 5 }}
          >
            {userInfo.user.email}
          </Text>

          {/* <DropdownComponent /> */}
        </View>
      </View>

      {/* RESUME */}
      <View style={{ marginHorizontal: 15 }}>
        <Text style={styles.textFavorite}>Мои резюме</Text>
        <Text style={styles.textUnderFavorite}>
          {/* {resumesLoading
            ? resumes
              ? `${resumes.data.length} резюме`
              : "0 резюме"
            : "Загрузка..."} */}
        </Text>
      </View>

      {!isErrorView && (
        <>
          {resumesLoading ? (
            <>
              {resumes.data.length !== 0 ? (
                <Animated.ScrollView
                  showsVerticalScrollIndicator={false}
                  // style={{ marginHorizontal: 15 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {/* resumes */}

                  <View>
                    <>
                      {/* cards */}
                      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                        <FlatList
                          scrollEnabled={false}
                          data={resumes.data}
                          renderItem={({ item, index }) => (
                            <Animatable.View
                              animation="fadeIn"
                              duration={1000}
                              delay={index * 300}
                            >
                              {console.log(item.resume)}
                              <ResumeCard item={item.resume} />
                            </Animatable.View>
                          )}
                          keyExtractor={(item, index) => `key-${index}`}
                          contentContainerStyle={{ rowGap: 10 }}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                      {/* BUTTON */}
                      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                          activeOpacity={0.4}
                          onPress={() =>
                            navigation.navigate("CreateResumeScreen")
                          }
                        >
                          <View style={styles.backgroundBtnResponse}>
                            <Text style={styles.textBtn}>Добавить резюме</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </>
                  </View>
                </Animated.ScrollView>
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.titleNullFavoriteJobs}>
                      Резюме не создано
                    </Text>
                    <Text style={styles.textNullFavoriteJobs}>
                      Создайте резюме, чтобы отправить его при отклике на
                      вакансию работадателя.
                    </Text>
                  </View>

                  {/* BUTTON */}
                  <View style={{ marginHorizontal: 15 }}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() => navigation.navigate("CreateResumeScreen")}
                    >
                      <View style={styles.backgroundBtnResponse}>
                        <Text style={styles.textBtn}>Добавить резюме</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          ) : (
            <View style={{ marginHorizontal: 15 }}>
              <View style={styles.wrapperSkeletonFavoriteJobCard}>
                <SkeletonJobCard />
                <SkeletonJobCard />
                <SkeletonJobCard />
                <SkeletonJobCard />
              </View>
            </View>
          )}
        </>
      )}

      {isErrorView && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.main,
              textAlign: "center",
              fontFamily: "MontserratBold",
              fontSize: 26,
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          >
            Что-то пошло не так
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PoppinsText",
              fontSize: 16,
              opacity: 0.5,
              marginHorizontal: 20,
            }}
          >
            Извините, произошла непредвиденная ошибка. Пожалуйста, попробуйте
            повторить попытку через некоторое время.
          </Text>
        </View>
      )}
    </View>

    // <StatusBar style="dark" />
    // <Text style={{ marginBottom: 10, fontSize: 24 }}>ProfileScreen</Text>

    // {userInfo.user?.name && <Text>{userInfo.user.name}</Text>}

    // {userInfo.user?.email && (
    //   <Text style={{ marginBottom: 30 }}>{userInfo.user.email}</Text>
    // )}

    // <TouchableOpacity onPress={logout} style={{ marginBottom: 30 }}>
    //   <Text style={{ color: "red" }}>выйти из акканута</Text>
    // </TouchableOpacity>

    // <TouchableOpacity onPress={onboardingDelete}>
    //   <Text style={{ color: "red" }}>очистить onboarding</Text>
    // </TouchableOpacity>
  );
}

export default ProfileScreen;
