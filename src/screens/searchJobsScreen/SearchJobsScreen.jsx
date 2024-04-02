import React, { useContext, useEffect, useState } from "react";
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
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import ApiManager from "../../utils/userApi";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import SearchInput from "../../components/searchInput/SearchInput";
import * as Animatable from "react-native-animatable";
import Animated from "react-native-reanimated";
import JobCard from "../../components/jobCard/JobCard";
import filter from "lodash.filter";
import { AuthContext } from "../../context/AuthContext";
import {
  isSameDay,
  isSameMonth,
  isSameYear,
  differenceInDays,
  differenceInMonths,
} from "date-fns";
import { COLORS } from "./../../constants/color";

//styles
import styles from "./searchJobsScreen.style";

//svg
import SvgFilter from "./../../components/svg/filter/SvgFilter";
import SvgBackArrow from "../../components/svg/SvgBackArrow";

function SearchJobsScreen({ route }) {
  let searchValue = route.params?.textPH;

  const [jobCardDate, setJobCardDate] = useState([]);
  const [filteredJobCardDate, setFilteredJobCardDate] = useState([]);

  const [isFavorite, setIsFavorite] = useState([]);

  const { userInfo } = useContext(AuthContext);

  const [jobLoadingDate, setLoadingDate] = useState(false);
  const [isFilteredJobsNull, setFilteredJobsNull] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  //filter
  const filter = route.params?.filter || {};
  const timePublished = filter.timePublished || "";
  const sortBy = filter.sortBy || "";
  const experience = filter.experience || "";
  const tags = filter.tags || [];
  const city = filter.city || [];

  const handleBackNavigate = () => {
    navigation.goBack();
  };

  //useEffect date
  useEffect(() => {
    onResponse();

    console.log(tags);
  }, []);

  //useEffect date
  useEffect(() => {
    onResponse();
  }, [searchValue]);

  const FilterData = (allJobs) => {
    const query = route.params?.textPH;
    let filteredJobs = [...allJobs]; // Создаем копию массива

    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title_job.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Фильтрация по времени публикации
    if (timePublished !== "") {
      const today = new Date();
      const publishedDates = {
        "За все время": () => true,
        "За день": (job) =>
          isSameDay(new Date(job.published_at), today) &&
          isSameMonth(new Date(job.published_at), today) &&
          isSameYear(new Date(job.published_at), today),
        "За неделю": (job) =>
          differenceInDays(today, new Date(job.published_at)) <= 7,
        "За месяц": (job) =>
          differenceInMonths(today, new Date(job.published_at)) <= 1,
      };

      filteredJobs = filteredJobs.filter((job) =>
        publishedDates[timePublished](job)
      );
    }

    // Фильтрация по опыту работы
    if (experience !== "") {
      const cleanedExperience = experience
        .toLowerCase()
        .replace(" лет", "")
        .replace(" года", "");
      filteredJobs = filteredJobs.filter((job) => {
        const jobExperience = job.experience
          .toLowerCase()
          .replace(" лет", "")
          .replace(" года", "");
        return jobExperience === cleanedExperience;
      });
    }

    // Фильтрация по тегам
    if (tags.length > 0) {
      const trimmedTags = tags.map((tag) => tag.trim()); // Удаляем пробелы в начале и конце тегов
      filteredJobs = filteredJobs.filter((job) =>
        job.tags.some((jobTag) => trimmedTags.includes(jobTag.title))
      );
    }

    // Фильтрация по городам
    if (city.length > 0) {
      const trimmedCity = city.map((cit) => cit.trim()); // Удаляем пробелы в начале и конце городов
      filteredJobs = filteredJobs.filter((job) =>
        trimmedCity.includes(job.city)
      );
    }

    // Сортировка
    if (sortBy !== "") {
      filteredJobs.sort((a, b) => {
        if (sortBy === "По дате") {
          return new Date(b.published_at) - new Date(a.published_at);
        } else if (sortBy === "По зарплате") {
          const salaryA = parseSalary(a.price);
          const salaryB = parseSalary(b.price);
          return salaryB - salaryA;
        }
      });
    }
    if (filteredJobs.length !== 0) {
      setFilteredJobCardDate(filteredJobs);
      setLoadingDate(true);
      setRefreshing(false);
    } else {
      setFilteredJobsNull(true);
      setLoadingDate(true);
      setRefreshing(false);
    }
  };

  const parseSalary = (salary) => {
    const [minSalary, maxSalary] = salary.split(" - ");
    return minSalary ? parseInt(minSalary.replace(/\s/g, "")) : 0;
  };

  const parseExperience = (experience) => {
    if (experience === "Нет опыта") {
      return 0;
    }
    const [minExperience, maxExperience] = experience.split(" - ");
    return parseInt(minExperience);
  };

  const onRefresh = () => {
    setRefreshing(true);
    onResponse();
  };

  const onResponse = () => {
    Promise.all([
      ApiManager.get("/api/posts"),
      ApiManager.get(`/api/wishlist/${userInfo.user?.id}`),
    ])
      .then(([postsResponse, wishlistResponse]) => {
        if (postsResponse.data.status) {
          setJobCardDate(postsResponse.data.posts);
          FilterData(postsResponse.data.posts);
        } else {
          // alert("Что-то не так", "Технические неполадки");
        }

        if (wishlistResponse.data) {
          setIsFavorite(wishlistResponse.data);
        } else {
          // alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        Alert.alert("Что-то не так", "Технические неполадки");
      });
  };

  const isPostInFavorites = (postId) => {
    if (isFavorite.data !== undefined) {
      return isFavorite.data.some((favorite) => favorite.post_id === postId);
    }
    return;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* TOP_MENU */}

      <View style={styles.wrapperTopNavigate}>
        <View style={styles.leftBoxTopMenu}>
          <TouchableOpacity
            onPress={handleBackNavigate}
            activeOpacity={0.4}
            style={{
              paddingVertical: 5,
              paddingRight: 5,
            }}
          >
            <SvgBackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapperSearchInput}>
          <SearchInput
            textHolder={
              route.params?.textPH === ""
                ? "Поиск вакансии"
                : `${route.params?.textPH}`
            }
            // navigate={() => navigation.goBack()}
            navigate={() =>
              // navigation.navigate("SearchScreen", {
              //   dataJobs: jobCardDate,
              // })
              navigation.navigate("SearchScreen", {
                textPH: route.params?.textPH,
                // filter: route.params?.filter,
              })
            }
          />
        </View>

        <View style={{ marginRight: 15 }}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() =>
              navigation.push("FilterSreen", {
                textPH: route.params?.textPH,
                filter: route.params?.filter,
              })
            }
          >
            <View style={styles.wrapperSvgFilter}>
              <SvgFilter />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* is not null */}
      {isFilteredJobsNull === false && (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* JOBS */}

          <View>
            {jobLoadingDate ? (
              <>
                {route.params?.textPH ? (
                  <View style={styles.wrapperNewJobs}>
                    <Text style={styles.titleNewJobs}>
                      {route.params?.textPH === ""
                        ? ""
                        : `Найдено вакансий по запросу "${route.params?.textPH}"`}

                      {/* Найдено вакансий по запросу "
                  {route.params?.textPH === ""
                    ? "Все вакансии"
                    : }
                  " */}
                    </Text>

                    <Text style={[styles.textAllShowJobs, { marginTop: 5 }]}>
                      Вакансий: {filteredJobCardDate.length}
                    </Text>
                  </View>
                ) : (
                  isFilteredJobsNull === false && (
                    <Text style={styles.textAllShowJobs}>
                      Вакансий: {filteredJobCardDate.length}
                    </Text>
                  )
                )}

                {/* cards */}
                <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                  <FlatList
                    scrollEnabled={false}
                    data={filteredJobCardDate}
                    renderItem={({ item, index }) => (
                      <Animatable.View
                        animation="fadeIn"
                        duration={1000}
                        delay={index * 100}
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
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                  />
                </View>
              </>
            ) : (
              <ActivityIndicator size="large" style={{ marginTop: 30 }} />
            )}
          </View>
        </Animated.ScrollView>
      )}

      {/* is null */}
      {isFilteredJobsNull && (
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
            Ничего нет
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
            Попробуйте поискать что-то другое или изменить настройки фильтров.
          </Text>
        </View>
      )}
    </View>
  );
}

export default SearchJobsScreen;
