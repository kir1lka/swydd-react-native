import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    backgroundColor: COLORS.background,
  },

  wrapperTopMenu: {
    marginHorizontal: 15,
  },

  //title

  wrapperPopularJobs: {
    marginTop: 13,
    marginBottom: 100,
  },

  titlePopularJobs: {
    fontSize: 24,
    fontFamily: "MontserratSemiBold",
    marginBottom: 10,
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

  //DropdownEducation
  DropdownBack: {
    backgroundColor: "white",
  },
  dropdown: {
    height: 45,
    borderColor: "#e6e6e6",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 15,
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
