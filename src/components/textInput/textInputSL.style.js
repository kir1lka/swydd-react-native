import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "./../../constants/color";

const styles = StyleSheet.create({
  wrapperTextInput: {
    width: 315,
    height: 51,
    borderRadius: 10,
    marginBottom: 5,
    color: "#000",
    paddingLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },

  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    width: 250,
  },

  focusedTextInput: {
    borderColor: COLORS.main,
  },

  errorTextInput: {
    borderColor: "red",
  },
});

export default styles;
