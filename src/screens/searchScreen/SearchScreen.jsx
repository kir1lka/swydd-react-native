import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import ApiManager from "../../utils/userApi";
import { useNavigation, StackActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import SearchInput from "../../components/searchInput/SearchInput";
import filter from "lodash.filter";

//styles
import styles from "./searchScreen.style";

//svg
import SvgFilter from "./../../components/svg/filter/SvgFilter";
import SvgBackArrow from "../../components/svg/SvgBackArrow";
import SvgSearch from "../../components/svg/tabNavigate/SvgSearch";

function SearchScreen({ route }) {
  const navigation = useNavigation();

  const [jobCardDate, setJobCardDate] = useState([]);
  const [filteredJobCardDate, setFilteredJobCardDate] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setJobCardDate(route.params?.dataJobs);
    onResponse();

    if (route.params?.textPH) {
      setSearchValue(route.params?.textPH ? `${route.params?.textPH}` : "");
    }
  }, []);

  useEffect(() => {
    FilterData();
  }, [searchValue, jobCardDate]);

  //functions
  const onResponse = () => {
    ApiManager.get("/api/posts")
      .then((res) => {
        if (res.data.status) {
          setJobCardDate(res.data.posts);
        } else {
          Alert.alert("Что-то не так", "Технические неполадки");
        }
      })
      .catch((error) => {
        // console.error("posts:", error);
        Alert.alert("Что-то не так", "Технические неполадки");
      });
  };

  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const handleSearchInput = (value) => {
    setSearchValue(value);
  };

  const enterSearch = () => {
    const replaceAction = StackActions.replace("SearchJobsScreen", {
      textPH: searchValue.trim(),
      dataJobs: jobCardDate,
    });
    navigation.dispatch(replaceAction);
  };

  const FilterData = () => {
    // setLoadingDate(true);
    // setRefreshing(false);

    const query = searchValue.trim();
    const allJobs = jobCardDate;

    const filteredJobs = query
      ? filter(allJobs, (job) =>
          job.title_job.toLowerCase().includes(query.toLowerCase())
        )
      : allJobs;

    setFilteredJobCardDate(filteredJobs);
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
            textHolder="Поиск вакансий"
            searchValue={searchValue}
            // valueText={searchValue}
            onSearchInput={handleSearchInput}
            enterSearch={enterSearch}
          />
        </View>
      </View>

      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 0,
            marginHorizontal: 15,
          }}
        >
          {searchValue.trim() ? (
            <TouchableOpacity
              style={styles.borderTextResult}
              onPress={() => {
                const replaceAction = StackActions.replace("SearchJobsScreen", {
                  textPH: searchValue.trim(),
                  dataJobs: jobCardDate,
                });
                navigation.dispatch(replaceAction);
              }}
            >
              <SvgSearch color="#8c8c8c" />
              <Text style={styles.textResult}>{searchValue}</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <FlatList
            scrollEnabled={false}
            data={filteredJobCardDate}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeIn"
                duration={1000}
                delay={index * 300}
              >
                <TouchableOpacity
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  activeOpacity={0.4}
                  onPress={() => {
                    const replaceAction = StackActions.replace(
                      "SearchJobsScreen",
                      {
                        textPH: item.title_job.trim(),
                        dataJobs: jobCardDate,
                      }
                    );
                    navigation.dispatch(replaceAction);
                  }}
                >
                  <SvgSearch />
                  <Text style={styles.textResult}>{item.title_job}</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
            keyExtractor={(item, index) => `key-${index}`}
            contentContainerStyle={{ rowGap: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

export default SearchScreen;
