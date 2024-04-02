//react
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";

//components
import * as Animatable from "react-native-animatable";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");
import { COLORS } from "./../../constants/color";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import SvgSetting from "./../../components/svg/SvgSetting";
import Animated from "react-native-reanimated";
import Spinner from "react-native-loading-spinner-overlay";
import ApiManager from "../../utils/userApi";
import Toast from "react-native-toast-message";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";
import SvgDelete from "../../components/svg/SvgDelete";

//styles
import styles from "./chatResponseScreen.style";

//navigate
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

function ChatResponseScreen({ route, navigation }) {
  // const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  //ref and sheeBottom
  const bottomModalResponse = useRef(null);
  const snapPoints = ["28%"];
  const [isOpen, setIsOpen] = useState(false);

  //funct
  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const handleModalResponse = () => {
    bottomModalResponse.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const handleCloseModal = () => {
    bottomModalResponse.current?.dismiss();
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleDeleteResponse = () => {
    setLoading(true);
    // console.log(route.params?.responseid);
    ApiManager.delete(`/api/response/${route.params?.responseid}`)
      .then(() => {
        setLoading(false);

        handleCloseModal();
        navigation.goBack();
        Toast.show({
          type: "success",
          text1: "Отклик был успешно удален!",
        });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Что-то не так", "Технические неполадки");
        // console.error("handleDeleteResponse:", error);
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          {/* loading */}
          <Spinner visible={loading} />

          <StatusBar style="dark" />

          {/* SHEETBOTTOM */}
          <BottomSheetModal
            ref={bottomModalResponse}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{
              borderRadius: 10,
            }}
            onDismiss={() => setIsOpen(false)}
          >
            {/* title */}
            <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
              <Text
                style={{
                  paddingTop: 15,
                  fontFamily: "MontserratSemiBold",
                  fontSize: 22,
                  marginBottom: 5,
                }}
              >
                Действия с откликом
              </Text>
            </View>
            <View>
              {/* cards */}

              <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                <Animatable.View animation="fadeIn" duration={1000} delay={300}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => handleDeleteResponse()}
                  >
                    <View style={{ marginRight: 15 }}>
                      <SvgDelete color={"#000"} />
                    </View>
                    <Text
                      style={{
                        fontFamily: "PoppinsText",
                        fontSize: 16,
                      }}
                    >
                      Удалить отклик
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </View>
          </BottomSheetModal>

          {/* overlay */}
          {isOpen && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 1,
              }}
              activeOpacity={1}
              onPress={() => handleCloseModal()}
              // pointerEvents="box-none"
            />
          )}

          {/* TOP_MENU */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <View style={styles.wrapperTopMenu}>
              {/* left */}
              <View style={styles.leftBoxTopMenu}>
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

              {/* center */}
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, fontFamily: "MontserratSemiBold" }}
                >
                  Отклик на вакансию
                </Text>
              </View>

              {/* right */}
              {/* <View style={styles.rightBoxTopMenu}> */}
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => handleModalResponse()}
              >
                <View style={styles.backgroundSvgFavorite}>
                  <SvgSetting color={"#000"} />
                </View>
              </TouchableOpacity>

              {/* </View> */}
            </View>
          </View>

          {/* MAIN CHAT */}
          <View style={{ flex: 1, backgroundColor: "#e6e6e6" }}>
            {/* message */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 0,
                  paddingVertical: 20,
                  borderRadius: 10,
                  width: "80%",
                }}
              >
                <Text style={styles.titleNullFavoriteJobs}>
                  Чат не доступен
                </Text>
                <Text style={styles.textNullFavoriteJobs}>
                  Чат станет доступен, когда работадатель проверит ваше резюме.
                </Text>
              </View>
            </View>
          </View>

          {/* bottom */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "rgba(0, 0, 0, 0.2)",

              backgroundColor: "#fff",
              paddingTop: 10,
              paddingBottom: 40,
              paddingHorizontal: 15,

              flexDirection: "row",
            }}
          >
            {/* input */}
            <View
              style={{
                flex: 1,
                marginRight: 15,
                height: 45,
                backgroundColor: "#fff",
                borderRadius: 10,
                color: "#000",
                paddingLeft: 20,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#e6e6e6",
              }}
            >
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
                Cообщение
              </Text>
            </View>

            {/* button */}
            <View
              style={{
                height: 45,
                width: 45,
                // borderWidth: 1,
                // borderColor: "#e6e6e6",
                backgroundColor: "#e6e6e6",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
                }}
              >
                <SvgBackArrow color={"#fff"} />
              </View>
            </View>
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default ChatResponseScreen;
