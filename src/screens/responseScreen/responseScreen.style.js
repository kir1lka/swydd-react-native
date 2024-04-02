import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
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
});

export default styles;
