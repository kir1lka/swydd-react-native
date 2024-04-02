import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";
import { SIZE } from "./../../constants/size";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
  },

  //TOP_MENU

  wrpapp2: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    elevation: 1000,
  },

  wrapperTopNavigate: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    elevation: 1000,

    // height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  wrapperSearchInput: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },

  wrapperSvgFilter: {
    backgroundColor: COLORS.main,
    padding: 8,
    borderRadius: 10,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  //POPULAR JOBS

  wrapperPopularJobs: {
    marginTop: 13,
    marginBottom: 20,
  },

  titlePopularJobs: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    marginBottom: 10,
    paddingLeft: 15,
  },

  wrapperSkeletonPopulJobs: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 15,
    columnGap: 10,
  },

  //NEW JOBS

  wrapperNewJobs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleNewJobs: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    marginBottom: 10,
    paddingLeft: 15,
  },

  textAllShowJobs: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: COLORS.main,
  },

  wrapperSkeletonJobCard: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },

  //ALL JOBS BUTTON

  wrapperAllJobsBtn: {
    marginBottom: 15,
    flex: 1,
    marginHorizontal: 15,
  },

  backgroundBtn: {
    height: 50,
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
