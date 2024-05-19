//react
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";

//drawer
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

//navigate
import { NavigationContainer, useNavigation } from "@react-navigation/native";

//tabBar
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//components
import HomeScreen from "../screens/homeScreen/HomeScreen";
import ResponseScreen from "../screens/responseScreen/ResponseScreen";
import ProfileScreen from "../screens/profileScreen/ProfileScreen";
import FavoriteScreen from "../screens/favoriteScreen/FavoriteScreen";
import JobScreen from "../screens/jobScreen/JobScreen";
import FilterSreen from "../screens/filterScreen/FilterScreen";
import SearchScreen from "../screens/searchScreen/SearchScreen";
import SearchJobsScreen from "../screens/searchJobsScreen/SearchJobsScreen";
import SettingsScreen from "../screens/settingsScreen/SettingsScreen";
import AboutScreen from "../screens/aboutScreen/AboutScreen";
import CommunicationScreen from "../screens/communicationScreen/CommunicationScreen";
import CreateResumeScreen from "../screens/createResumeScreen/CreateResumeScreen";
import ResumeScreen from "../screens/resumeScreen/ResumeScreen";
import EditResumeScreen from "../screens/editResumeScreenn/EditResumeScreenn";
import ChatResponseScreen from "../screens/chatResponseScreen/ChatResponseScreen";
import TagsScreen from "../screens/tagsScreen/TagsScreen";

//const
import { COLORS } from "./../constants/color";

//svg
import SvgSearch from "../components/svg/tabNavigate/SvgSearch";
import SvgFavorite from "../components/svg/tabNavigate/SvgFavorite";
import SvgResponse from "../components/svg/tabNavigate/SvgResponse";
import SvgProfile from "../components/svg/tabNavigate/SvgProfile";
import { AuthContext } from "../context/AuthContext";
import SvgSetting from "../components/svg/SvgSetting";
import SvgLogo from "../components/svg/SvgLogo";
import SvgInfo from "../components/svg/SvgInfo";
import SvgBackArrow from "../components/svg/SvgBackArrow";
import { BlurView } from "expo-blur";

function ProfileStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          drawerLabel: () => null,
          drawerIcon: () => null,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="EditResumeScreen"
        component={EditResumeScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerLabel: () => null,
          drawerIcon: () => null,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="ResumeScreen"
        component={ResumeScreen}
        options={{
          animation: "slide_from_bottom",

          headerShown: false,
          gestureEnabled: true,
          drawerLabel: () => null,
          drawerIcon: () => null,
          drawerItemStyle: { display: "none" },
        }}
      />
      {/* <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          animation: "slide_from_bottom",

          // title: "Настройки",
          headerShown: false,
          gestureEnabled: true,
          headerTintColor: "#000",
        }}
      /> */}
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "О приложении",
          headerShown: false,
          gestureEnabled: true,
          headerTintColor: "#000",

          drawerIcon: ({ color }) => <SvgInfo color={color} />,
        }}
      />
      <Stack.Screen
        name="CreateResumeScreen"
        component={CreateResumeScreen}
        options={{
          animation: "slide_from_bottom",

          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          animation: "slide_from_bottom",

          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          animation: "slide_from_bottom",

          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="FilterSreen"
        component={FilterSreen}
        options={{
          animation: "slide_from_bottom",

          // title: "Фильтр",
          headerShown: false,
          gestureEnabled: true,
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="TagsScreen"
        component={TagsScreen}
        options={{
          title: "tags",
          headerShown: true,
          gestureEnabled: true,
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          animation: "fade",

          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="SearchJobsScreen"
        component={SearchJobsScreen}
        options={{
          animation: "fade",

          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ResponseStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ResponseScreen"
        component={ResponseScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabNavigation() {
  const tabBarStyle =
    Platform.OS !== "ios"
      ? {
          height: 60,
          paddingBottom: 10,
        }
      : {};

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: "#7c7c7c",
        tabBarActiveTintColor: COLORS.main,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "MontserratBold",
        },
        tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Поиск"
        component={HomeStack}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({ color }) => <SvgSearch color={color} />,
        }}
      />
      <Tab.Screen
        name="Избранное"
        component={FavoriteStack}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({ color }) => <SvgFavorite color={color} />,
        }}
      />
      <Tab.Screen
        name="Отклики"
        component={ResponseStack}
        options={({ route }) => ({
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ color }) => <SvgResponse color={color} />,
        })}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileStack}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({ color }) => <SvgProfile color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} />
      <Stack.Screen
        name="ChatResponseScreen"
        component={ChatResponseScreen}
        options={({ route }) => ({
          animation: "slide_from_bottom",

          // title: "Отклик на вакансию",
          // headerShown: true,
          tabBarVisible: false,
          gestureEnabled: true,
          headerTintColor: "#000",
        })}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          animation: "slide_from_bottom",

          // title: "Настройки",
          headerShown: false,
          gestureEnabled: true,
          headerTintColor: "#000",
        }}
      />
    </Stack.Navigator>
  );
}

export default TabNavigation;
