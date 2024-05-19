import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  container: {
    // height: 160,
    // paddingVertical: 15,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#e6e6e6",
    display: "flex",
    flexDirection: "row",
  },

  //left wrapper

  wrapperLeft: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 15,
  },

  textTitleJob: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    color: COLORS.main,
  },

  textPrice: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    marginBottom: 10,
  },

  textExperience: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    opacity: 0.7,
  },

  textCity: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.7,
  },

  textTime: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.7,
  },

  //right wrapper

  wrapperRight: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  logoCompany: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    // borderWidth: 1,
    // borderColor: "#e6e6e6",
    borderRadius: 10,
  },

  logoCompanyNull: {
    width: 50,
    height: 50,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textCompanyNull: {
    fontFamily: "PoppinsText",
    fontSize: 20,
    opacity: 0.4,
  },

  textCompany: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    textAlign: "center",
    width: 120,
  },

  //favorite icons

  favoriteWrapper: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 20,
    height: 20,
  },

  //tags
  tagContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginLeft: 15,
    flex: 1,
  },
  tagItem: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: "flex-start",
  },
});

export default styles;
