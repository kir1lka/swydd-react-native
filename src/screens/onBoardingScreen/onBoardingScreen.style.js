//react
import { Dimensions, StyleSheet } from "react-native";

//Dimensions
const { width, height } = Dimensions.get("window");

//components
import { COLORS } from "../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 44,
  },

  //TopMenu
  TopMenucontainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 44,
  },
  LeftText: {
    height: 40,
    width: 50,
    justifyContent: "center",
  },
  SkipText: {
    fontFamily: "PoppinsText",
    fontSize: 16,
    color: COLORS.main,
  },

  //onBoarding elements
  ImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleST: {
    color: COLORS.main,
    fontFamily: "PoppinsTitle",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    marginBottom: 5,
  },
  DescriptionST: {
    fontFamily: "PoppinsText",
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    // marginHorizontal: 34,
    width: 300,
    marginBottom: 27,
  },

  //bottomContent
  BottomContainer: {
    alignItems: "center",
    marginBottom: 54,
  },
  DotsWrapper: {
    flexDirection: "row",
    marginBottom: 27,
  },
  DotSt: (index, activeScreen) => ({
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: index === activeScreen ? COLORS.main : "#EBEBEB",
    marginHorizontal: 4,
  }),

  NextButton: {
    backgroundColor: COLORS.main,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  TextFinishBtn: {
    fontFamily: "PoppinsSemiBold",
    color: COLORS.background,
    fontSize: 18,
  },
  FinishButton: {
    backgroundColor: COLORS.main,
    height: 50,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
