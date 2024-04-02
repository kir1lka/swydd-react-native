import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  containerForm: {
    display: "flex",
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
  },

  //NAVIGATETOP
  wrapperTopNavigate: {
    height: 44,
    marginLeft: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  //TITLE
  title: {
    marginBottom: 5,
    fontFamily: "PoppinsTitle",
    fontSize: 30,
  },
  textUnderTitle: {
    fontFamily: "PoppinsText",
    fontSize: 17,
    opacity: 0.3,
  },

  //FORGOT
  wrapperInput: { alignItems: "center", marginTop: 30 },
  wrapperForgot: { width: 315, marginBottom: 30 },
  textForgot: {
    color: COLORS.main,
    textDecorationLine: "underline",
    fontFamily: "PoppinsText",
    fontSize: 18,
  },

  titleError: {
    width: 315,
    fontFamily: "PoppinsText",
    // marginTop: 25,
    marginBottom: 5,
    color: "red",
    fontSize: 14,
  },

  mainTitleError: {
    fontFamily: "PoppinsText",
    marginTop: 25,
    marginBottom: 5,
    textAlign: "center",
    color: "red",
    fontSize: 17,
  },

  //NAVIGATE IN SIGNUP
  wrapperBottomNavigate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 44,
  },
  textBottomNavigate: { fontFamily: "PoppinsText", fontSize: 17 },
  linkBottomNavigate: {
    paddingLeft: 5,
    color: COLORS.main,
    textDecorationLine: "underline",
    fontFamily: "PoppinsText",
    fontSize: 17,
  },
});

export default styles;
