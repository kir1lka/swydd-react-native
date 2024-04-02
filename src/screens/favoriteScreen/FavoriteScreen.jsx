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
import styles from "./favoriteScreen.style";

function FavoriteScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorView, setErrorView] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  let favoriteJobCardLenght;

  const [jobLoadingDate, setLoadingDate] = useState(false);
  const [jobCardDate, setJobCardDate] = useState([]);

  const [isFavorite, setIsFavorite] = useState([]);

  const { userInfo, isLoading, logoutContext } = useContext(AuthContext);

  //useEffect date
  useFocusEffect(
    React.useCallback(() => {
      onResponse();
      console.log(favoriteJobCardLenght);
    }, [])
  );

  const onRefresh = () => {
    favoriteJobCardLenght = jobCardDate.filter((item) =>
      isPostInFavorites(item.id)
    ).length;
    setRefreshing(true);
    onResponse();
  };

  const onResponse = async () => {
    favoriteJobCardLenght = jobCardDate.filter((item) =>
      isPostInFavorites(item.id)
    ).length;

    try {
      const [postsResponse, wishlistResponse] = await Promise.all([
        ApiManager.get("/api/posts"),
        ApiManager.get(`/api/wishlist/${userInfo.user?.id}`),
      ]);

      if (postsResponse.data.status) {
        setJobCardDate(postsResponse.data.posts);
        setLoadingDate(true);
        setRefreshing(false);
      } else {
        // alert("технические шокаладки1");
        setErrorView(true);
      }

      if (wishlistResponse.data) {
        setIsFavorite(wishlistResponse.data);
      } else {
        // alert("технические шокаладки3");
        setErrorView(true);
      }
    } catch (error) {
      // console.error("Error in API requests:", error);
      setLoadingDate(true);
      setErrorView(true);
    }
  };

  const isPostInFavorites = (postId) => {
    if (isFavorite.data !== undefined) {
      return isFavorite.data.some((favorite) => favorite.post_id === postId);
    }
    return;
  };

  const favoriteJobCards = jobCardDate.filter((item) =>
    isPostInFavorites(item.id)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* TOP_MENU */}
      <View style={styles.wrapperTopNavigate}>
        <Text style={styles.textFavorite}>Избранное</Text>
      </View>

      {!isErrorView && (
        <>
          {jobLoadingDate ? (
            <>
              {favoriteJobCards.length !== 0 ? (
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
                          data={jobCardDate.filter((item) =>
                            isPostInFavorites(item.id)
                          )}
                          renderItem={({ item, index }) => (
                            <Animatable.View
                              animation="fadeIn"
                              duration={1000}
                              delay={index * 300}
                            >
                              <JobCard
                                item={item}
                                tags={item.tags}
                                isFavorite={isPostInFavorites(item.id)}
                                userId={userInfo.user?.id}
                              />
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
                      Избранных вакансий пока нет
                    </Text>
                    <Text style={styles.textNullFavoriteJobs}>
                      Найдите вакансию и нажмите на «Сердечко», чтобы вернуться
                      к ней позже. Вы сможете откликнуться, когда будет удобно.
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

export default FavoriteScreen;
