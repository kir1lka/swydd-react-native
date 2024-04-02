import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: COLORS.background,
  },

  //TOP_MENU

  wrapperTopNavigate: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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

  leftBoxTopMenu: {
    marginLeft: 15,
  },

  //JOBS

  wrapperNewJobs: {
    justifyContent: "space-between",
  },

  titleNewJobs: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    paddingHorizontal: 15,
  },

  textAllShowJobs: {
    fontSize: 14,
    fontFamily: "PoppinsText",
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#8c8c8c",
  },

  wrapperSkeletonJobCard: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },
});

export default styles;
