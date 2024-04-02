//react
import { Dimensions, StyleSheet } from "react-native";

//Dimensions
const { width, height } = Dimensions.get("window");

//components
import { COLORS } from "../../constants/color";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 160,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    zIndex: 1,
    fontFamily: "MontserratExtraBold",
    color: COLORS.background,
    fontSize: 17,
  },

  text: {
    zIndex: 1,
    fontFamily: "PoppinsMedium",
    color: COLORS.background,
    opacity: 0.8,
    fontSize: 14,
  },

  backgroundImg: {
    position: "absolute",
    width: 160,
    height: 70,
    borderRadius: 10,
    top: 0,
    left: 0,
    resizeMode: "contain",
    zIndex: 0,
  },
});

export default styles;
