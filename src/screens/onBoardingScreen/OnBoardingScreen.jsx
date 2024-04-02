//react
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useAnimatedValue,
} from "react-native";

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//styles
import styles from "./onBoardingScreen.style";

//components
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { SIZE } from "../../constants/size";

//components svg
import SvgArrow from "../../components/svg/SvgArrow";
import SvgBackArrow from "../../components/svg/SvgBackArrow";

import { onBoardingList } from "./../../data/onBoardingList";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OnBoardingScreen() {
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const [activeScreen, setActiveScreen] = useState(0);

  //functions
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZE.width);
    setActiveScreen(currentIndex);
  };

  const scrollToScreen = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SIZE.width,
        animated: true,
      });
    }
  };

  const goToNextScreen = () => {
    const nextScreenIndex = activeScreen + 1;
    if (nextScreenIndex < onBoardingList.length) {
      scrollToScreen(nextScreenIndex);
    }
  };

  const goBack = () => {
    const previousScreenIndex = activeScreen - 1;
    if (previousScreenIndex >= 0) {
      scrollToScreen(previousScreenIndex);
    }
  };

  const handleDone = () => {
    AsyncStorage.setItem("onboarded", "1");
    navigation.navigate("AppNavigate");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* TOP_MENU */}
      <View style={styles.TopMenucontainer}>
        {/* left */}
        <Animatable.View
          animation={`${activeScreen === 0 ? "fadeOut" : "fadeIn"}`}
          duration={300}
        >
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={goBack}
            style={styles.LeftText}
          >
            <View style={{ marginLeft: 15 }}>
              <SvgBackArrow />
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* right */}
        <Animatable.View
          animation={`${activeScreen === 2 ? "fadeOut" : "fadeIn"}`}
          duration={300}
        >
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity activeOpacity={0.4} onPress={handleDone}>
              <Text style={styles.SkipText}>Пропустить</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>

      {/* BODY */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled
        decelerateionRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAligment="center"
        onMomentumScrollEnd={handleScroll}
      >
        {/* ONBOARDING */}
        {onBoardingList.map((screenObj, index) => (
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            key={index}
            style={{ width: SIZE.width }}
          >
            {/* Image */}
            <View style={styles.ImageContainer}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={screenObj.img}
                  resizeMode="contain"
                  style={{ width: "90%", height: "100%" }}
                />
              </View>
            </View>

            {/* UnderContent */}
            <View style={{ alignItems: "center" }}>
              {/* title */}
              <Text style={styles.TitleST}>{screenObj.title}</Text>

              {/* description */}
              <Text style={styles.DescriptionST}>{screenObj.description}</Text>
            </View>
          </Animatable.View>
        ))}
      </Animated.ScrollView>

      {/* BOTTOM */}
      <View style={styles.BottomContainer}>
        {/* dots */}
        <View style={styles.DotsWrapper}>
          {onBoardingList.map((dot, index) => (
            <TouchableOpacity
              activeOpacity={0.4}
              key={`dot-${index}`}
              onPress={() => scrollToScreen(index)}
            >
              <View style={styles.DotSt(index, activeScreen)}></View>
            </TouchableOpacity>
          ))}
        </View>
        {/* button */}
        {activeScreen === 2 ? (
          <TouchableOpacity onPress={handleDone} activeOpacity={0.4}>
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              style={styles.FinishButton}
            >
              <Text style={styles.TextFinishBtn}>Начать</Text>
            </Animatable.View>
          </TouchableOpacity>
        ) : (
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            useNativeDriver={true}
          >
            <TouchableOpacity onPress={goToNextScreen} activeOpacity={0.4}>
              <View style={styles.NextButton}>
                <SvgArrow />
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </View>
  );
}

export default OnBoardingScreen;
