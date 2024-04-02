import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
  },

  //TOP_MENU

  wrapperTopNavigate: {
    height: 45,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },

  wrapperSearchInput: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },

  leftBoxTopMenu: {
    marginLeft: 15,
  },

  //text result

  borderTextResult: {
    paddingTop: 15,
    paddingBottom: 10,
    borderColor: "#8c8c8c",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  textResult: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: "PoppinsText",
  },

  //menu
  rightBoxTopMenu: {
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
    marginRight: 10,
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

  //logo and user
  wrapperDetailsLogoJob: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //     justifyContent: "space-between",
    marginBottom: 0,
    marginHorizontal: 15,
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
    marginRight: 15,
    //     width: 80,
    //     height: 80,
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
    fontFamily: "MontserratBold",
    fontSize: 45,
    color: "#FFF",
  },

  logoCompanyNull: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.main,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  //RESUME

  textFavorite: {
    paddingTop: 15,
    fontFamily: "MontserratSemiBold",
    fontSize: 22,
  },

  textUnderFavorite: {
    fontFamily: "PoppinsText",
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 0,
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

  //DropdownComponent
  DropdownBack: {
    backgroundColor: "white",
  },
  dropdown: {
    height: 45,
    width: 200,
    borderColor: "#e6e6e6",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
