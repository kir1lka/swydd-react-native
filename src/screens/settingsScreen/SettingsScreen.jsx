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

//svg
import SvgFavoriteDetails from "./../../components/svg/jobDetails/SvgFavoriteDetails";
import SvgShareDetails from "./../../components/svg/jobDetails/SvgShareDetails";
import SvgBackArrow from "../../components/svg/SvgBackArrow";

//styles
import styles from "./settingScreen.style";

//components
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constants/color";
import Spinner from "react-native-loading-spinner-overlay";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { View as AnimatableView } from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen() {
  const { userInfo, isLoading, logoutContext } = useContext(AuthContext);

  const [isAboutApp, setAboutApp] = useState(false);

  const logout = () => {
    // AsyncStorage.removeItem("userInfo");
    logoutContext();
  };

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 44,
        paddingBottom: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <Spinner visible={isLoading} />

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
            }}
          >
            <SvgBackArrow />
          </TouchableOpacity>
        </View>

        {/* center */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontFamily: "MontserratSemiBold" }}>
            Настройки
          </Text>
        </View>

        {/* right */}

        <View style={{ flex: 1, marginRight: 15 }}></View>
      </View>

      {/* MAIN */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: 15, marginTop: 10 }}
      >
        {/* APP */}
        <TouchableOpacity
          onPress={() => setAboutApp(isAboutApp === true ? false : true)}
          style={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "red",
            paddingVertical: 8,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratSemiBold",
              }}
            >
              Об приложении
            </Text>
          </View>
          <View
            style={{
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          >
            <SvgBackArrow />
          </View>
        </TouchableOpacity>

        {isAboutApp && (
          <AnimatableView animation="fadeIn" duration={1000}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "PoppinsText",
                color: "#000",
                marginBottom: 10,
              }}
            >
              Кроссплатформенное приложение SWYDD, созданное с использованием
              React Native и Laravel, обеспечивает высокую производительность и
              гибкость на разных платформах. React Native позволяет
              разрабатывать нативные приложения с использованием JavaScript, а
              Laravel предоставляет мощный и безопасный PHP-фреймворк для
              разработки веб-приложений. Наше приложение имеет широкий спектр
              функций и адаптивный дизайн, что делает его идеальным решением для
              бизнеса или личных нужд.
            </Text>

            <Text
              style={{ fontSize: 15, fontFamily: "PoppinsText", color: "#000" }}
            >
              Актуальность данной работы обусловлена изменениями в методах
              поиска работы за последние годы. Онлайн-платформы становятся всё
              более востребованными, в то время как традиционные подходы к
              трудоустройству теряют свою действенность. Современным людям,
              ищущим работу необходим простой и актуальный инструмент для
              успешного поиска вакансий, и мобильные приложения могут
              предоставить им необходимые средства для быстрого нахождения
              подходящих возможностей и подачи заявок.
            </Text>
          </AnimatableView>
        )}

        {/* ABOUT */}
      </Animated.ScrollView>

      {/* LOGOUT */}
      <TouchableOpacity
        onPress={logout}
        style={{
          height: 50,
          marginVertical: 5,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          margin: 30,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "red",
            color: COLORS.background,
            fontFamily: "PoppinsSemiBold",
            fontSize: 16,
          }}
        >
          Выйти из акканута
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;
