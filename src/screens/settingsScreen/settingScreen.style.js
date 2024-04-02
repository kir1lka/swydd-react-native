import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: COLORS.background,
    // backgroundColor: "gray",
  },

  //TOP_MENU

  wrapperTopMenu: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftBoxTopMenu: {
    marginLeft: 15,
    flex: 1,
  },

  rightBoxTopMenu: {
    marginRight: 0,
    flexDirection: "row",
  },

  backgroundSvgFavorite: {
    borderWidth: 2,
    borderColor: "#e6e6e6",
    padding: 8,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  backgroundSvgFavoriteActive: {
    backgroundColor: COLORS.favoriteBag,
    padding: 8,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  backgroundSvgShare: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 8,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  // TITLE JOB

  titleJob: {
    fontSize: 26,
    fontFamily: "MontserratBold",
    marginBottom: 5,
    paddingLeft: 15,
    color: COLORS.main,
  },

  priceJob: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 15,
    paddingLeft: 15,
    color: "#000",
  },

  //DETAILS AND LOGO

  wrapperDetailsLogoJob: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  textExperience: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    paddingLeft: 15,
    color: "#000",
  },

  textCity: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    paddingLeft: 15,
    color: "#000",
  },

  textTime: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    paddingLeft: 15,
    color: "#000",
  },

  boxLogo: {
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#e6e6e6",
    borderRadius: 10,
    width: 80,
    height: 80,
    justifyContent: "center",
  },

  logoCompany: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },

  textNameCompany: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    width: 120,
    textAlign: "center",
  },

  textCompanyNull: {
    fontFamily: "PoppinsText",
    fontSize: 20,
    opacity: 0.4,
  },

  logoCompanyNull: {
    width: 50,
    height: 50,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  //DESCRIPTION

  wrapperDescription: {
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 25,
  },

  titleDescription: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
    color: "#000",
  },

  boxDescription: {
    // borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    // paddingVertical: 10,
    // backgroundColor: "#e6e6e6",
  },

  textDescription: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    color: "#000",
  },

  //NUMBER

  wrapperContacts: {
    marginHorizontal: 15,
    marginBottom: 30,
  },

  titleContacts: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
    color: "#000",
  },

  backgroundDetailsContacts: {
    // borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    // padding: 10,
    flexDirection: "row",
  },

  textNumberName: {
    fontSize: 16,
    fontFamily: "PoppinsText",
    color: "#000",
  },

  number: {
    fontSize: 16,
    fontFamily: "PoppinsText",
    color: COLORS.main,
    textDecorationLine: "underline",
  },

  //BUTTON RESPONSEJOB

  backgroundBtnResponse: {
    height: 50,
    marginVertical: 5,
    backgroundColor: COLORS.main,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textBtn: {
    color: COLORS.background,
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
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
    marginRight: 10,
    alignSelf: "flex-start",
  },
});

export default styles;
