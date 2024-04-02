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
    flexDirection: "row",
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
});

export default styles;
