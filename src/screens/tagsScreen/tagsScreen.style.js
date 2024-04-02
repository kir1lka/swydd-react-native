import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
  },

  // TOP_MENU

  wrapperTopMenu: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 5,
  },

  leftBoxTopMenu: {
    flex: 1,
    marginLeft: 15,
  },

  rightBoxTopMenu: {
    marginRight: 15,
    width: 50,
    alignItems: "flex-end",
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

  wrapperTopNavigate: {
    marginHorizontal: 0,
    marginBottom: 10,
  },

  wrapperSearchInput: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },

  textFavorite: {
    paddingTop: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    fontFamily: "MontserratSemiBold",
    fontSize: 30,
  },

  textUnderFavorite: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 10,
    marginHorizontal: 15,
  },

  titleNullFavoriteJobs: {
    color: COLORS.main,
    textAlign: "center",
    fontFamily: "MontserratBold",
    fontSize: 26,
    marginBottom: 10,
    marginHorizontal: 20,
  },

  textNullFavoriteJobs: {
    textAlign: "center",
    fontFamily: "PoppinsText",
    fontSize: 16,
    opacity: 0.5,
    marginHorizontal: 20,
  },

  wrapperSkeletonFavoriteJobCard: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },

  //BUTTON

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

  //extInput
  wrapperTextInput: {
    height: 45,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    color: "#000",
    paddingLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
});

export default styles;
