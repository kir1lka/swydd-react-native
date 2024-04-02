//react
import React, { useEffect, useState, useContext, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Animated,
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
import Animated2 from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import ButtonSL from "./../../components/buttonSL/ButtonSL";
import axios from "axios";
import JobCard from "../../components/jobCard/JobCard";
import ApiManager from "../../utils/userApi";
import SearchInput from "../../components/searchInput/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "./../../constants/color";
//styles
import styles from "./homeSreen.style";

//svg
import SvgFilter from "./../../components/svg/filter/SvgFilter";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//skeletons
import SkeletonPopularCardJob from "../../components/popularCardJob/SkeletonPopularCardJob";
import SkeletonJobCard from "../../components/jobCard/SkeletonJobCard";

function HomeScreen() {
  const { userInfo } = useContext(AuthContext);

  const [isErrorView, setErrorView] = useState(false);

  //animated
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const Header_max_height = 50;
  const Header_min_height = 5;
  const Scroll_Distance = Header_max_height - Header_min_height;

  let clampedScrollValue = 0;
  let offsetValue = 0;
  let scrollValue = 0;

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  //favorite
  const [isFavorite, setIsFavorite] = useState([]);

  //popularCard
  const [popularJobCard, setPopularJobCard] = useState([]);
  const [popularJobLoading, setPopularJobLoading] = useState(false);

  //jobCard
  const [jobCardDate, setJobCardDate] = useState([]);
  const [jobLoadingDate, setLoadingDate] = useState(false);

  //useEffect date
  useFocusEffect(
    React.useCallback(() => {
      onResponse();
    }, [])
  );

  //functions
  const onResponse = () => {
    ApiManager.get("/api/posts")
      .then((res) => {
        if (res.data.status) {
          setJobCardDate(res.data.posts);
          setLoadingDate(true);
          setRefreshing(false);
          // console.log(res.data.posts);
        } else {
          // alert("технические шокаладки1");
          setErrorView(true);
        }
      })
      .catch((error) => {
        // console.error("posts:", error);
        setErrorView(true);
      });

    ApiManager.get("/api/popularJobCard")
      .then((res) => {
        if (res.data.status) {
          setPopularJobCard(res.data.popularCardJob);
          setPopularJobLoading(true);
          setRefreshing(false);
          // console.log(res.data.posts);
        } else {
          // alert("технические шокаладки2");
          setErrorView(true);
        }
      })
      .catch((error) => {
        // console.error("posts:", error);
        setErrorView(true);
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
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPopularJobLoading(false);
    setLoadingDate(false);
    onResponse();
  };

  const isPostInFavorites = (postId) => {
    if (isFavorite.data !== undefined) {
      return isFavorite.data.some((favorite) => favorite.post_id === postId);
    }
    return;
  };

  //component
  const DynamicHeader = ({ value }) => {
    const animatedHeaderHeight = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [Header_max_height, Header_min_height],
      extrapolate: "clamp",
    });

    const animatedHeaderOpacity = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const animatedHeaderTranslate = value.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [0, -60],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.wrpapp2,
          {
            height: animatedHeaderHeight,
            opacity: animatedHeaderOpacity,
            transform: [{ translateY: animatedHeaderTranslate }],
          },
        ]}
      >
        <Animated.View style={styles.wrapperTopNavigate}>
          <View style={styles.wrapperSearchInput}>
            <SearchInput
              textHolder="Поиск вакансий"
              navigate={() =>
                navigation.navigate("SearchScreen", {
                  dataJobs: jobCardDate,
                })
              }
            />
          </View>

          <View style={{ marginRight: 15 }}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.push("FilterSreen")}
            >
              <View style={styles.wrapperSvgFilter}>
                <SvgFilter />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <DynamicHeader value={scrollOffsetY} />

      {!isErrorView && (
        <Animated2.ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollOffsetY } },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={5}
          // onMomentumScrollBegin
          // onMomentumScrollEnd
          // onScrollEndDrag
        >
          {/* POPULAR JOBS */}
          <View style={styles.wrapperPopularJobs}>
            <Text style={styles.titlePopularJobs}>Популярные профессии</Text>
            {/* cards */}
            <View>
              {popularJobLoading ? (
                <>
                  <FlatList
                    scrollEnabled={true}
                    data={popularJobCard}
                    renderItem={({ item, index }) => (
                      <Animatable.View
                        animation="fadeIn"
                        duration={800}
                        delay={index * 300}
                      >
                        <PopularCardJob item={item} />
                      </Animatable.View>
                    )}
                    contentContainerStyle={{ columnGap: 0, paddingLeft: 15 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </>
              ) : (
                <View style={styles.wrapperSkeletonPopulJobs}>
                  <SkeletonPopularCardJob />
                  <SkeletonPopularCardJob />
                  <SkeletonPopularCardJob />
                </View>
              )}
            </View>
          </View>

          {/*NEW JOBS */}
          <View>
            <View style={styles.wrapperNewJobs}>
              <Text style={styles.titleNewJobs}>Новые вакансии</Text>

              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() =>
                  navigation.navigate("SearchJobsScreen", {
                    textPH: "",
                    dataJobs: jobCardDate,
                  })
                }
              >
                <Text style={styles.textAllShowJobs}>показать все</Text>
              </TouchableOpacity>
            </View>
            {/* cards */}
            <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
              {jobLoadingDate ? (
                <>
                  <FlatList
                    scrollEnabled={false}
                    data={jobCardDate.slice(0, 6)}
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
                </>
              ) : (
                <View style={styles.wrapperSkeletonJobCard}>
                  <SkeletonJobCard />
                  <SkeletonJobCard />
                  <SkeletonJobCard />
                  <SkeletonJobCard />
                </View>
              )}
            </View>
          </View>

          {/* ALL JOBS BUTTON */}
          <View style={styles.wrapperAllJobsBtn}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() =>
                navigation.navigate("SearchJobsScreen", {
                  textPH: "",
                  dataJobs: jobCardDate,
                })
              }
            >
              <View style={styles.backgroundBtn}>
                <Text style={styles.textBtn}>Показать все вакансии</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated2.ScrollView>
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

export default HomeScreen;
