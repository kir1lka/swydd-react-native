import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
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
