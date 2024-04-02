//react
import React, { useContext, useEffect, useRef, useState } from "react";
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
  Vibration,
  Alert,
  // Modal,
} from "react-native";

//components
import { StatusBar } from "expo-status-bar";

import axios from "axios";
import JobCard from "../../components/jobCard/JobCard";
import ApiManager from "../../utils/userApi";
import moment from "moment";
import SkeletonJobScreen from "./SkeletonJobScreen";
import { COLORS } from "./../../constants/color";
import "moment/locale/ru";
moment.locale("ru");
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../../context/AuthContext";
// import { BottomSheetProvider } from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { lazy } from "react/cjs/react.production.min";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ResumeCard from "../../components/resumeCard/ResumeCard";
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

//svg
import SvgFavoriteDetails from "./../../components/svg/jobDetails/SvgFavoriteDetails";
import SvgShareDetails from "./../../components/svg/jobDetails/SvgShareDetails";
import SvgBackArrow from "../../components/svg/SvgBackArrow";

//styles
import styles from "./jobScreen.style";

function JobScreen({ navigation, route }) {
  const { userInfo } = useContext(AuthContext);

  const user_id = route.params?.userId;

  //ref and sheeBottom
  const bottomModalResponse = useRef(null);
  const snapPoints = ["48%", "78%"];
  const [isOpen, setIsOpen] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  //resume
  const [resumes, setResumes] = useState([]);

  //response
  const [response, setResponse] = useState([]);

  let post_id = route.params?.jobId;
  let hasResponse =
    Array.isArray(response) &&
    response.some((item) => item.post_id === post_id);

  //favorite
  const [isFavorite, setIsFavorite] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  //jobCard
  const [jobCardDate, setJobCardDate] = useState([]);
  const [similarJob, setSimilarJob] = useState([]);
  const [favoriteDate, setFavoriteDate] = useState([]);
  const [jobLoadingDate, setLoadingDate] = useState(false);
  const [tags, setTags] = useState([]);

  //useEffect date
  useFocusEffect(
    React.useCallback(() => {
      dataWishlist();
      onResponse();
    }, [])
  );

  //useEffect date
  // useEffect(() => {
  //   dataWishlist();
  //   onResponse();
  // }, []);

  useEffect(() => {
    if (favoriteDate !== null) {
      setIsFavorite(favoriteDate);
    } else {
      dataWishlist();
    }
  }, [favoriteDate]);

  //functions
  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const onResponse = async () => {
    setFavoriteLoading(true);

    OnResponseDate();

    try {
      const [wishlistResponse, resumeResponse, jobCardResponse, postsResponse] =
        await Promise.all([
          ApiManager.get(`/api/wishlist/${userInfo.user?.id}`),
          ApiManager.get(`/api/resume/${userInfo.user?.id}`),
          ApiManager.get(`/api/posts/${route.params?.jobId}`),
          ApiManager.get("/api/posts"),
        ]);

      if (wishlistResponse.data) {
        setIsFavorite(wishlistResponse.data);
      } else {
        // Alert.alert("Что-то не так", "Технические неполадки");
      }

      if (resumeResponse.data) {
        setResumes(resumeResponse.data);
      } else {
        // Alert.alert("Что-то не так", "Технические неполадки");
      }

      if (jobCardResponse.data.status) {
        setJobCardDate(jobCardResponse.data.posts);
        setTags(jobCardResponse.data.posts.tags);
        setLoadingDate(true);
        setRefreshing(false);
      } else {
        // Alert.alert("Что-то не так", "Технические неполадки");
      }

      if (postsResponse.data.status) {
        var data = postsResponse.data.posts;

        const filteredData = data.filter(
          (post) => post.id !== route.params?.jobId
        );

        setSimilarJob(filteredData);
      } else {
        // Alert.alert("Что-то не так", "Технические неполадки");
      }
    } catch (error) {
      alert("Что-то не так", "Технические неполадки");
    } finally {
      setFavoriteLoading(false);
      setLoadingDate(true);
    }
  };

  const OnResponseDate = () => {
    ApiManager.get(`/api/response/${userInfo.user?.id}`)
      .then((res) => {
        if (res.data) {
          setResponse(res.data.data);
        } else {
          Alert.alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        Alert.alert("Что-то не так", "Технические неполадки");
      });
  };

  const dataWishlist = () => {
    ApiManager.get(`/api/wishlist/${route.params?.userId}`)
      .then((res) => {
        if (res.data) {
          setFavoriteDate(res.data);
          setIsFavorite(true);
          // console.log("route.params:", route.params?.userId);
        } else {
          Alert.alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        Alert.alert("Что-то не так", "Технические неполадки");
        // console.error("wishlist:", error);
      });
  };

  const addToWishlist = () => {
    ApiManager.post(`/api/wishlist/add`, null, {
      params: {
        post_id,
        user_id,
      },
    })
      .then((res) => {
        if (res.data) {
          dataWishlist();
        } else {
          alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        alert("Что-то не так", "Технические неполадки");
        // console.error("addToWishlist:", error);
      });
  };

  const removeFromWishlist = () => {
    ApiManager.delete(`/api/wishlist/remove`, {
      data: { user_id, post_id },
    })
      .then((res) => {
        if (res.data) {
          // alert("Удалили вакансию из избранного!");

          dataWishlist();
        } else {
          alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        // console.error("removeFromWishlist:", error);
        alert("Что-то не так", "Технические неполадки");
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // setLoadingDate(false);
    onResponse();

    hasResponse =
      Array.isArray(response) &&
      response.some((item) => item.post_id === post_id);
  };

  const isPostInFavorites = (postId) => {
    if (isFavorite.data !== undefined) {
      return isFavorite.data.some((favorite) => favorite.post_id === postId);
    }
    return;
  };

  const handleModalResponse = () => {
    bottomModalResponse.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const handleCloseModal = () => {
    // onRefresh();
    OnResponseDate();

    bottomModalResponse.current?.dismiss();
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {/* <View
          style={{
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        /> */}

        <View style={styles.container}>
          <StatusBar style="dark" />

          {/* SHEETBOTTOM */}
          <BottomSheetModal
            ref={bottomModalResponse}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{
              borderRadius: 10,
              // shadowColor: "black",
              // shadowOffset: {
              //   width: 0,
              //   height: 10,
              // },
              // shadowOpacity: 0.58,
              // shadowRadius: 26.0,

              // elevation: 24,
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
                Мои резюме
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsText",
                  fontSize: 14,
                  opacity: 0.5,
                  marginBottom: 0,
                }}
              >
                Выберите резюме
              </Text>
            </View>

            {resumes.data && resumes.data.length > 0 && (
              <Animated.ScrollView showsVerticalScrollIndicator={false}>
                <View>
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
                          <ResumeCard
                            item={item.resume}
                            response={true}
                            responseDate={{
                              date: new Date(),
                              user_resume_id: item.id,
                              status_response_id: 3,
                              post_id: jobCardDate.id,
                            }}
                            onCloseModal={handleCloseModal}
                          />
                        </Animatable.View>
                      )}
                      keyExtractor={(item, index) => `key-${index}`}
                      contentContainerStyle={{ rowGap: 10 }}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>

                  {/* BUTTON */}
                  {/* <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => navigation.navigate("ProfileScreen")}
                  >
                    <View style={styles.backgroundBtnResponse}>
                      <Text style={styles.textBtn}>Добавить резюме</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                </View>
              </Animated.ScrollView>
            )}

            {resumes.data && resumes.data.length === 0 && (
              <View
                style={{
                  height: "40%",
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
                  Нечего отправлять
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
                  Для отклика на вакансию нужно сделать резюме, что бы его
                  создать надо перейти в «Профиль».
                </Text>
              </View>
            )}
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
              onPress={() => bottomModalResponse.current?.dismiss()}
              // pointerEvents="box-none"
            />
          )}

          {/* TOP_MENU */}
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

            {/* right */}

            {jobLoadingDate &&
              (isFavorite ? (
                <View style={styles.rightBoxTopMenu}>
                  {favoriteDate.data?.some(
                    (item) => item.post_id === route.params?.jobId
                  ) ? (
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={removeFromWishlist}
                    >
                      <View style={styles.backgroundSvgFavoriteActive}>
                        <SvgFavoriteDetails
                          fill={true}
                          color={COLORS.favorite}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={addToWishlist}
                    >
                      <View style={styles.backgroundSvgFavorite}>
                        <SvgFavoriteDetails />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <></>
              ))}
          </View>

          {jobLoadingDate ? (
            <>
              <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {/* TITLE JOB */}
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.titleJob}>{jobCardDate.title_job}</Text>
                  <Text
                    style={styles.priceJob}
                  >{`${jobCardDate.price} руб.`}</Text>
                </View>

                {/* DETAILS AND LOGO */}
                <View style={styles.wrapperDetailsLogoJob}>
                  {/* details */}
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.textExperience}>
                      {`Опыт работы: ${jobCardDate.experience} ${
                        jobCardDate.experience === `без опыта` ? `` : `года`
                      }`}
                    </Text>
                    <Text
                      style={styles.textCity}
                    >{`г. ${jobCardDate.city}`}</Text>
                    <Text style={styles.textTime}>
                      Добавлено: {moment(jobCardDate.published_at).format("LL")}
                    </Text>
                  </View>

                  {/* logo */}
                  <View style={{ paddingRight: 15 }}>
                    <View style={styles.boxLogo}>
                      {jobCardDate.logo !== null && jobCardDate.logo !== "" ? (
                        <Image
                          source={{
                            uri: jobCardDate.logo,
                          }}
                          style={styles.logoCompany}
                        />
                      ) : (
                        <View style={styles.logoCompanyNull}>
                          <Text style={styles.textCompanyNull}>?</Text>
                        </View>
                      )}

                      <Text style={styles.textNameCompany}>
                        {jobCardDate.name_company}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* TAGS */}
                <View style={styles.tagContainer}>
                  {tags.map((tag, index) => (
                    <View
                      key={index}
                      style={[
                        styles.tagItem, // Применяем стиль tagItem к каждому элементу тега
                        {
                          backgroundColor: `${tag.background}`,
                          color: `${tag.color}`,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MontserratSemiBold",
                          color: `${tag.color}`,
                        }}
                      >
                        # {tag.title}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* DESCRIPTION */}
                <View style={styles.wrapperDescription}>
                  <Text style={styles.titleDescription}>Описание работы</Text>
                  <View style={styles.boxDescription}>
                    <Text style={styles.textDescription}>
                      {jobCardDate.description}
                    </Text>
                  </View>
                </View>

                {/* CONTACTS */}
                <View style={styles.wrapperContacts}>
                  <Text style={styles.titleContacts}>Номер телефона</Text>

                  {/* number name */}
                  <View style={styles.backgroundDetailsContacts}>
                    <Text style={styles.textNumberName}>
                      {`${jobCardDate.phone_name}: `}
                    </Text>

                    {/* number */}
                    <TouchableOpacity activeOpacity={0.4}>
                      <Text style={styles.number}>{jobCardDate.phone}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* NEWJOBS */}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "MontserratSemiBold",
                        marginBottom: 10,
                        paddingLeft: 15,
                      }}
                    >
                      Похожии вакансии
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() =>
                        navigation.navigate("SearchJobsScreen", {
                          textPH: "",
                          dataJobs: jobCardDate,
                        })
                      }
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "PoppinsText",
                          marginBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          color: COLORS.main,
                        }}
                      >
                        показать все
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* cards */}
                  <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                    {!favoriteLoading && (
                      <FlatList
                        scrollEnabled={false}
                        data={similarJob.slice(0, 3)}
                        renderItem={({ item, index }) => (
                          <Animatable.View
                            animation="fadeIn"
                            duration={1000}
                            delay={index * 300}
                          >
                            <JobCard
                              item={item}
                              isFavorite={isPostInFavorites(item.id)}
                              tags={item.tags}
                              userId={userInfo.user?.id}
                            />
                          </Animatable.View>
                        )}
                        keyExtractor={(item, index) => `key-${index}`}
                        contentContainerStyle={{ rowGap: 10 }}
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  </View>
                </View>
              </Animated.ScrollView>

              {/* BUTTON RESPONSEJOB */}
              <View style={{ marginHorizontal: 15 }}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={hasResponse ? null : handleModalResponse}
                  disabled={hasResponse}
                >
                  <View
                    style={[
                      styles.backgroundBtnResponse,
                      { backgroundColor: hasResponse ? "gray" : COLORS.main },
                    ]}
                  >
                    <Text style={styles.textBtn}>
                      {hasResponse ? "Вы уже откликнулись" : "Откликнуться"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* <View style={{ marginHorizontal: 15 }}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={handleModalResponse}
                >
                  <View style={styles.backgroundBtnResponse}>
                    <Text style={styles.textBtn}>Откликнуться</Text>
                  </View>
                </TouchableOpacity>
              </View> */}
            </>
          ) : (
            // <SkeletonJobScreen />
            <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          )}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default JobScreen;
