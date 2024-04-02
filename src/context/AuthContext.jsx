import React, { createContext, useEffect, useState } from "react";

import ApiManager from "./../utils/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStartSplashScreen, setIsLoadingStartSplashScreen] =
    useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [lastScreen, setLastScreen] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        await isLoggedIn();
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoadingStartSplashScreen(false);
      }
    };

    const fetchData = async () => {
      setIsLoadingStartSplashScreen(true);
      await checkLoggedIn();
    };

    fetchData();
  }, []);

  //
  // register
  //

  const registerContext = async (formData) => {
    setIsLoading(true);
    setErrorMessages(null);

    // console.log(formData.email);
    // console.log(formData.password);

    await ApiManager.post("api/register", formData)
      .then((res) => {
        if (res.data.status) {
          setIsLoading(false);
          setUserInfo(res.data);
          let userdata = res.data;
          AsyncStorage.setItem("userInfo", JSON.stringify(userdata));
          setErrorMessages(null);
          // console.log(res.data);
        } else {
          setErrorMessages(res.data.message);
          setIsLoading(false);
          setLastScreen("SignUpScreen");
          // console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Regist error:", error);
        setIsLoading(false);
        // console.log(res.data);
      });
  };

  //
  // login
  //

  const loginContext = async (formData) => {
    setIsLoading(true);
    setErrorMessages(null);

    await ApiManager.post("api/login", formData)
      .then((res) => {
        if (res.data.status) {
          setIsLoading(false);
          setUserInfo(res.data);
          let userdata = res.data;
          AsyncStorage.setItem("userInfo", JSON.stringify(userdata));
          setErrorMessages(null);
          // console.log(res.data);
        } else {
          setIsLoading(false);
          setErrorMessages(res.data.message);
          setLastScreen("LogInSceen");
          // console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setIsLoading(false);
      });
  };

  //
  // logOut
  //

  const logoutContext = async () => {
    setIsLoading(true);

    try {
      const response = await ApiManager.post(
        "/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      if (response.data.status) {
        setIsLoading(false);
        // console.log(response.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo(null);
      } else {
        alert("Ошибка");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("LogOut error:", error);
    }
  };

  //
  // isLoggedIn
  //
  const isLoggedIn = async () => {
    // try {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo !== null && userInfo !== undefined) {
      setUserInfo(userInfo);
    } else {
      userInfo = null;
    }
    // } catch (e) {
    // } finally {
    // }
    setIsLoadingStartSplashScreen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        registerContext,
        loginContext,
        logoutContext,
        isLoading,
        userInfo,
        errorMessages,
        isLoadingStartSplashScreen,
        lastScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
