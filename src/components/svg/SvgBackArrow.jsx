import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({ color = "#000" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.6}
      d="m10 18-8-8 8-8"
    />
  </Svg>
);
export default SvgComponent;

// const SvgComponent = (props) => (
//   <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={8}
//     height={15}
//     fill="none"
//     {...props}
//   >
//     <Path
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="m7 13.815-6-6 6-6"
//     />
//   </Svg>
// );
// export default SvgComponent;
