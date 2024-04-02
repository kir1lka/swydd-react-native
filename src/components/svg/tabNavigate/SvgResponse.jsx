import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgResponse = ({ color }) => (
  // <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={23} fill="none">
  //   <Path
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M20.167 10.657v.843a9.167 9.167 0 1 1-5.436-8.378"
  //   />
  //   <Path
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M20.167 4.167 11 13.343l-2.75-2.75"
  //   />
  // </Svg>
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={18} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.334 1h17.333c1.192 0 2.167.9 2.167 2v12c0 1.1-.975 2-2.167 2H3.334c-1.192 0-2.167-.9-2.167-2V3c0-1.1.975-2 2.167-2Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.834 3 12 10 1.167 3"
    />
  </Svg>
);
export default SvgResponse;
