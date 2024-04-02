//react
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//components
import * as Animatable from "react-native-animatable";

//styles
import styles from "./popularCardJob.style";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const programmistList = [
  "Программис",
  "Frontent",
  "Подработка",
  "Python",
  "React",
  "Swift",
  "PHP",
  "JavaScript",
  "Api",
  "Backend",
];
const testList = ["Selenium", "UnitTest", "Postman", "Тестировщик"];
const smmList = ["Аналитика", "SMM", "Реклама", "Копирайт"];

function PopularCardJob({ item }) {
  const navigation = useNavigation();

  return (
    <Animatable.View animation="fadeIn" duration={3000}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={
          () =>
            // navigation.navigate("SearchJobsScreen", {
            //   textPH: item.title,
            // })
            // navigation.navigate('SearchScreen', { nextScreen: 'SearchJobsScreen' });
            // navigation.navigate(
            //   "SearchJobsScreen",
            //   { textPH: item.title },
            navigation.navigate("SearchJobsScreen", {
              // item.title
              textPH: "",
              filter: {
                timePublished: "За все время",
                sortBy: "По дате",
                experience: "",
                tags:
                  item.title === "Программист"
                    ? programmistList
                    : item.title === "Тестировщик"
                    ? testList
                    : smmList,
              },
            })
          // )
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          <Image
            source={{
              uri: item.img,
            }}
            style={styles.backgroundImg}
          />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

export default PopularCardJob;
