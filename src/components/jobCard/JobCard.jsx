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
import { COLORS } from "./../../constants/color";

//svg
import SvgFavoriteDetails from "./../../components/svg/jobDetails/SvgFavoriteDetails";

//styles
import styles from "./jobCard.style";

//navigate
import { useNavigation } from "@react-navigation/native";

function JobCard({
  item,
  isFavorite = false,
  userId,
  status,
  response = false,
  tags,
  responseid,
}) {
  // const [tags, setTags] = useState(item.tags);
  // console.log("tags " + tags.id);

  const navigation = useNavigation();
  // const relativeTime = moment(item.published_at).format("D MMMM");
  const relativeTime = moment(item.published_at).fromNow();

  return (
    <Animatable.View animation="fadeIn" duration={1000}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          if (response) {
            // navigation.goBack(navigation.push("ChatResponseScreen"));
            navigation.navigate("ChatResponseScreen", {
              responseid: responseid,
            });
          } else {
            // console.log("Pressed on similar job:", item.id);
            navigation.push("JobScreen", { jobId: item.id, userId: userId });
          }
        }}
      >
        {status && (
          <View
            style={{
              zIndex: 1,
              position: "relative",
              top: 7,
              left: 0,
            }}
          >
            <View
              style={{
                paddingHorizontal: 15,
                paddingTop: 7,
                paddingVertical: 14,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                backgroundColor: `orange`,
                flexDirection: "row",
                alignContent: "space-around",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "MontserratSemiBold",
                  color: "#fff",
                }}
              >
                {status.title}
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            paddingVertical: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            backgroundColor: "#fff",
            zIndex: 2,
          }}
        >
          <View style={styles.container}>
            {/* left wrapper */}
            <View style={styles.wrapperLeft}>
              <Text style={styles.textTitleJob}>{item.title_job}</Text>
              <Text style={styles.textPrice}>{item.price} руб.</Text>
              <Text style={styles.textExperience}>
                Опыт работы:{" "}
                {`${item.experience} ${
                  item.experience === "без опыта" ? "" : "года"
                }`}
              </Text>
              <Text style={styles.textCity}>{`г. ${item.city}`}</Text>

              <Text style={styles.textTime}>{`Добавлено ${relativeTime}`}</Text>
            </View>

            {/* right wrapper */}
            <View style={styles.wrapperRight}>
              {item.logo !== null && item.logo !== "" ? (
                <Image
                  source={{
                    uri: item.logo,
                  }}
                  style={styles.logoCompany}
                />
              ) : (
                <View style={styles.logoCompanyNull}>
                  <Text style={styles.textCompanyNull}>?</Text>
                </View>
              )}

              <Text style={styles.textCompany}>{item.name_company}</Text>
            </View>
          </View>

          {/* tags */}
          <View style={styles.tagContainer}>
            {tags &&
              tags.map((tag, index) => (
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

          {/* status */}
          {/* {status && (
          <>
            <View style={styles.tagContainer}>
              <View
                style={[
                  styles.tagItem, // Применяем стиль tagItem к каждому элементу тега
                  {
                    backgroundColor: `orange`,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "MontserratSemiBold",
                    color: "#fff",
                  }}
                >
                  {status.title}
                </Text>
              </View>
            </View>
          </>
        )} */}

          {/* favorite */}
          {isFavorite ? (
            <View style={styles.favoriteWrapper}>
              <SvgFavoriteDetails fill={true} color={COLORS.favorite} />
            </View>
          ) : (
            <>
              <View style={styles.favoriteWrapper}>
                {/* <SvgFavoriteDetails fill={false} color="#edeeec" /> */}
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

export default JobCard;
