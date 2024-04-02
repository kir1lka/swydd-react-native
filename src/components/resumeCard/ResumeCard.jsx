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
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");
import { COLORS } from "../../constants/color";
import ApiManager from "../../utils/userApi";
import Toast from "react-native-toast-message";

//svg
import SvgFavoriteDetails from "../svg/jobDetails/SvgFavoriteDetails";

//styles
import styles from "./resumeCard.style";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function JobCard({ item, response = false, responseDate, onCloseModal }) {
  const navigation = useNavigation();
  const relativeTime = moment(item.created_at).format("D MMMM");

  const onResponseResume = () => {
    // console.log(responseDate);

    ApiManager.post(`api/response/add/`, responseDate)
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Резюме было отправлено!",
        });
        if (onCloseModal) {
          onCloseModal();
        }
      })
      .catch((error) => {
        console.error("resume:", error);
        console.log(error);
      });
  };

  return (
    <Animatable.View animation="fadeIn" duration={1000}>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e6e6e6",
        }}
        activeOpacity={0.4}
        onPress={() => {
          if (response) {
            onResponseResume();
          } else {
            navigation.push("ResumeScreen", { resumeid: item.id });
            // console.log(item.id);
          }
        }}
      >
        <View style={styles.container}>
          {/* left wrapper */}
          <View style={styles.wrapperLeft}>
            <Text style={styles.textTitleJob}>{item.title}</Text>
            <Text style={styles.textPrice}>
              {item.surname} {item.name}{" "}
            </Text>
            <Text style={styles.textExperience}>
              Опыт работы:{" "}
              {`${item.experience} ${
                item.experience === "без опыта" ? "" : "года"
              }`}
            </Text>
            <Text style={styles.textCity}>{item.city}</Text>

            <Text style={styles.textTime}>{`Добавлено ${relativeTime}`}</Text>
          </View>

          {/* right wrapper */}
          <View style={styles.wrapperRight}>
            {/* {item.logo !== null ? (
              <Image
                source={{
                  uri: item.logo,
                }}
                style={styles.logoCompany}
              />
            ) : ( */}
            <View style={styles.logoCompanyNull}>
              <Text style={styles.textCompanyNull}>
                {item.surname.slice(0, 1)}
              </Text>
            </View>
            {/* )} */}

            <Text style={styles.textCompany}>{item.name_company}</Text>
          </View>
        </View>

        {/* tags
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
        </View> */}

        {/* favorite
        {isFavorite ? (
          <View style={styles.favoriteWrapper}>
            <SvgFavoriteDetails fill={true} color={COLORS.favorite} />
          </View>
        ) : (
          <>
            <View style={styles.favoriteWrapper}>
              <SvgFavoriteDetails fill={false} color="#edeeec" />
            </View>
          </>
        )} */}
      </TouchableOpacity>
    </Animatable.View>
  );
}

export default JobCard;
