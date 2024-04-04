//react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

//svg
import SvgBackArrow from "../../components/svg/SvgBackArrow";

//navigate
import { StackActions, useNavigation } from "@react-navigation/native";

//styles
import styles from "./filterScreen.style";
import { COLORS } from "./../../constants/color";

//components
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

function FilterScreen({ route }) {
  const navigation = useNavigation();

  //filter
  const [selectedTimePublished, setSelectedTimePublished] =
    useState("За все время");
  const [selectedSortBy, setSelectedSortBy] = useState("По дате");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

  const listSort = ["По дате", "По зарплате"];
  const listTimePublished = [
    "За все время",
    "За день",
    "За неделю",
    "За месяц",
  ];
  const listCity = [
    "Белгород ",
    "Строитель ",
    "Яковлево ",
    "Москва ",
    "Екатеринбург ",
    "Краснодар ",
    "Казань ",
    "Самара ",
    "Нижний Новгород ",
    "Ростов-на-Дону ",
    "Санкт-Петербург ",
    "Новосибирск ",
  ];
  const listExperience = [
    "Без опыта",
    "1 - 2 года",
    "3 - 4 года",
    "4 - 6 года",
  ];
  const listTags = [
    "Программист ",
    "Frontend ",
    "Подработка ",
    "Python ",
    "React ",
    "Swift ",
    "PHP ",
    "JavaScript ",
    "Selenium ",
    "UnitTest ",
    "Postman ",
    "Api ",
    "Backend ",
    "Тестировщик ",
    "Аналитика ",
    "SMM ",
    "Реклама ",
    "Копирайт ",
  ];

  useEffect(() => {
    console.log(filter);

    const filter = route.params?.filter || "";

    if (filter !== "") {
      setSelectedTimePublished(filter.timePublished);
      setSelectedSortBy(filter.sortBy);
      setSelectedExperience(filter.experience);
      setSelectedTags(filter.tags);
      setSelectedCity(filter.city);
    }
  }, []);

  //function
  const handleBackNavigate = () => {
    navigation.goBack();
  };

  const resetFilters = () => {
    setSelectedTimePublished("За все время");
    setSelectedSortBy("По дате");
    setSelectedExperience("");
    setSelectedTags([]);
    setSelectedCity([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* TOP_MENU  */}
      <View>
        <View style={styles.wrapperTopMenu}>
          {/* left */}
          <View style={styles.leftBoxTopMenu}>
            <View
              style={{
                paddingVertical: 5,
                // paddingRight: 25,
              }}
            >
              <TouchableOpacity
                onPress={handleBackNavigate}
                activeOpacity={0.4}
              >
                <SvgBackArrow />
              </TouchableOpacity>
            </View>
          </View>

          {/* center */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontFamily: "MontserratSemiBold" }}>
              Фильтры
            </Text>
          </View>

          {/* right */}
          {/* <View style={styles.rightBoxTopMenu}> */}
          <View
            style={{
              flex: 1,
              marginRight: 15,
              width: 70,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => resetFilters()}>
              <Text style={{ color: COLORS.main, fontSize: 16 }}>Сбросить</Text>
            </TouchableOpacity>
          </View>

          {/* </View> */}
        </View>
      </View>

      {/* MAIN CHAT */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ marginHorizontal: 15 }}
      >
        {/* timePublished */}
        <View style={{ marginHorizontal: 0, marginBottom: 15, paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
              marginHorizontal: 15,
            }}
          >
            Время публикации
          </Text>

          <FlatList
            style={{ paddingTop: 5 }}
            scrollEnabled={true}
            data={listTimePublished}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeIn"
                duration={800}
                delay={index * 300}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => setSelectedTimePublished(item)}
                >
                  <View
                    style={{
                      // backgroundColor: COLORS.main,
                      backgroundColor:
                        selectedTimePublished === item
                          ? COLORS.main
                          : "#9B9B9B",
                      paddingHorizontal: 15,
                      paddingVertical: 7,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsText",
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
              columnGap: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* BottomWidth  */}
        <View
          style={{
            marginLeft: 15,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></View>

        {/* sort */}
        <View style={{ marginHorizontal: 0, marginBottom: 15, paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
              marginHorizontal: 15,
            }}
          >
            Сортировать
          </Text>

          <FlatList
            style={{ paddingTop: 5 }}
            scrollEnabled={true}
            data={listSort}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeIn"
                duration={800}
                delay={index * 300}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => setSelectedSortBy(item)}
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedSortBy === item ? COLORS.main : "#9B9B9B",
                      paddingHorizontal: 15,
                      paddingVertical: 7,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsText",
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
              columnGap: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* BottomWidth  */}
        <View
          style={{
            marginLeft: 15,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></View>

        {/* experience */}
        <View style={{ marginHorizontal: 0, marginBottom: 15, paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
              marginHorizontal: 15,
            }}
          >
            Опыт работы
          </Text>

          <FlatList
            style={{ paddingTop: 5 }}
            scrollEnabled={true}
            data={listExperience}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeIn"
                duration={800}
                delay={index * 300}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() =>
                    setSelectedExperience(
                      selectedExperience === item ? "" : item
                    )
                  }
                >
                  <View
                    style={{
                      backgroundColor:
                        selectedExperience === item ? COLORS.main : "#9B9B9B",
                      paddingHorizontal: 15,
                      paddingVertical: 7,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsText",
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
              columnGap: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* BottomWidth  */}
        <View
          style={{
            marginLeft: 15,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></View>

        {/* city */}
        <View style={{ marginHorizontal: 0, marginBottom: 15, paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MontserratSemiBold",
              marginBottom: 10,
              marginHorizontal: 15,
            }}
          >
            Город
          </Text>

          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
          >
            {listCity.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeIn"
                duration={800}
                delay={index * 100}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    if (selectedCity.includes(item)) {
                      setSelectedCity(
                        selectedCity.filter((tag) => tag !== item)
                      );
                    } else {
                      setSelectedCity([...selectedCity, item]);
                    }
                  }}
                  style={[
                    styles.tagItem,
                    {
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedCity.includes(item)
                        ? COLORS.main
                        : "#9B9B9B",
                    },
                  ]}
                >
                  <View style={styles.tagContainer}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsText",
                        color: "#fff",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>

        {/* BottomWidth  */}
        <View
          style={{
            marginLeft: 15,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></View>

        {/* tags */}
        <View style={{ marginHorizontal: 0, marginBottom: 15, paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* left */}
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "MontserratSemiBold",
                  marginBottom: 10,
                  marginHorizontal: 15,
                }}
              >
                Теги
              </Text>
            </View>

            {/* right */}
            {/* <TouchableOpacity
              onPress={() => navigation.push("TagsScreen")}
              style={{
                alignItems: "flex-end",
                marginRight: 15,
                transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
              }}
            >
              <SvgBackArrow color={COLORS.main} />
            </TouchableOpacity> */}
          </View>

          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
          >
            {listTags.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeIn"
                duration={800}
                delay={index * 100}
              >
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    if (selectedTags.includes(item)) {
                      setSelectedTags(
                        selectedTags.filter((tag) => tag !== item)
                      );
                    } else {
                      setSelectedTags([...selectedTags, item]);
                    }
                  }}
                  style={[
                    styles.tagItem,
                    {
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selectedTags.includes(item)
                        ? COLORS.main
                        : "#9B9B9B",
                    },
                  ]}
                >
                  <View style={styles.tagContainer}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsText",
                        color: "#fff",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>

      {/* BUTTON */}
      <View style={{ marginHorizontal: 15, marginBottom: 0 }}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            const replaceAction = StackActions.replace("SearchJobsScreen", {
              textPH: route.params?.textPH ? route.params?.textPH : "",
              filter: {
                timePublished: selectedTimePublished,
                sortBy: selectedSortBy,
                experience: selectedExperience,
                tags: selectedTags,
                city: selectedCity,
              },
            });
            navigation.dispatch(replaceAction);
          }}
        >
          <View style={styles.backgroundBtnResponse}>
            <Text style={styles.textBtn}>Смотреть вакансии</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FilterScreen;
