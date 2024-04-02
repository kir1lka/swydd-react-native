import React, { useContext, useEffect, useState } from "react";
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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import ApiManager from "../../utils/userApi";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import JobCard from "../../components/jobCard/JobCard";
import { AuthContext } from "../../context/AuthContext";
import SkeletonJobCard from "../../components/jobCard/SkeletonJobCard";
import { COLORS } from "./../../constants/color";

//styles
import styles from "./responseScreen.style";

function ResponseScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [isErrorView, setErrorView] = useState(false);

  //filter
  const [statusResponse, setStatusResponse] = useState("Все");
  const [filteredJobCards, setFilteredJobCards] = useState([]);
  const list = ["Все", "Принято", "Ожидание", "Отказ"];

  let favoriteJobCardLenght;

  //loading
  const [jobLoadingDate, setLoadingDate] = useState(false);
  const [jobCardDate, setJobCardDate] = useState([]);

  const [isFavorite, setIsFavorite] = useState([]);

  const { userInfo, isLoading, logoutContext } = useContext(AuthContext);

  //useEffect date
  useFocusEffect(
    React.useCallback(() => {
      onResponse();
    }, [])
  );

  useEffect(() => {
    filterJobCards();
  }, [statusResponse, jobCardDate]);

  const onRefresh = () => {
    favoriteJobCardLenght = jobCardDate.filter((item) =>
      isPostInFavorites(item.id)
    ).length;
    setRefreshing(true);
    onResponse();
  };

  const onResponse = () => {
    favoriteJobCardLenght = jobCardDate.filter((item) =>
      isPostInFavorites(item.id)
    ).length;

    ApiManager.get(`/api/response/${userInfo.user?.id}`)
      .then((res) => {
        if (res.data) {
          // setIsFavorite(res.data);
          setJobCardDate(res.data.data);
          console.log(res.data.data);
          setLoadingDate(true);
          setRefreshing(false);
        } else {
          // alert("технические шокаладки3");
          setErrorView(true);
        }
      })
      .catch((error) => {
        // console.error("response:", error);
        setErrorView(true);
        setLoadingDate(true);
      });

    ApiManager.get(`/api/wishlist/${userInfo.user?.id}`)
      .then((res) => {
        if (res.data) {
          setIsFavorite(res.data);
          // console.log("wishlist1:", isFavorite.post_id);
        } else {
          // alert("технические шокаладки3");
          setErrorView(true);
        }
      })
      .catch((error) => {
        // console.error("wishlist:", error);
        setErrorView(true);
        setLoadingDate(true);
      });
  };

  const isPostInFavorites = (postId) => {
    if (isFavorite.data !== undefined) {
      return isFavorite.data.some((favorite) => favorite.post_id === postId);
    }
    return;
  };

  const filterJobCards = () => {
    if (statusResponse === "Все") {
      setFilteredJobCards(jobCardDate);
    } else {
      const filtered = jobCardDate.filter(
        (jobCard) => jobCard.status_response.title === statusResponse
      );
      setFilteredJobCards(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* TOP_MENU */}
      <View style={styles.wrapperTopNavigate}>
        <Text style={styles.textFavorite}>Отклики</Text>
        <FlatList
          style={{ marginBottom: 0 }}
          scrollEnabled={true}
          data={list}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeIn"
              duration={800}
              delay={index * 300}
            >
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => setStatusResponse(item)}
              >
                <View
                  style={{
                    backgroundColor:
                      statusResponse === item ? COLORS.main : "#9B9B9B",
                    paddingHorizontal: 15,
                    paddingVertical: 7,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MontserratSemiBold",
                      color: "#fff",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          )}
          contentContainerStyle={{
            columnGap: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {!isErrorView && (
        <>
          {jobLoadingDate ? (
            <>
              {filteredJobCards.length !== 0 ? (
                <Animated.ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {/* JOBS */}

                  <View>
                    {/* {jobLoadingDate ? ( */}
                    <>
                      {/* cards */}
                      <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                        <FlatList
                          scrollEnabled={false}
                          data={filteredJobCards}
                          renderItem={({ item, index }) => (
                            <Animatable.View
                              animation="fadeIn"
                              duration={500}
                              delay={index * 300}
                            >
                              <View>
                                <View style={{ zIndex: 2 }}>
                                  <JobCard
                                    item={item.post}
                                    status={item.status_response}
                                    isFavorite={isPostInFavorites(item.post.id)}
                                    userId={userInfo.user?.id}
                                    response={true}
                                    responseid={item.id}
                                    tags={item.post.tags}
                                    // navigation={navigation}
                                  />
                                </View>
                              </View>

                              {/* {console.log(item.post)} */}
                            </Animatable.View>
                          )}
                          keyExtractor={(item, index) => `key-${index}`}
                          contentContainerStyle={{ rowGap: 10 }}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                    </>
                    {/* ) : (
              <ActivityIndicator size="large" style={{ marginTop: 30 }} />
            )} */}
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
                      Нет активных откликов
                    </Text>
                    <Text style={styles.textNullFavoriteJobs}>
                      Найдите вакансию и нажмите «Откликнуться», чтобы отправить
                      свое резюме на рассмотрение работодателю.
                    </Text>
                  </View>

                  {/* BUTTON */}
                  <View style={{ marginHorizontal: 15 }}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() => navigation.navigate("Поиск")}
                    >
                      <View style={styles.backgroundBtnResponse}>
                        <Text style={styles.textBtn}>Искать вакансии</Text>
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
  );
}

export default ResponseScreen;
