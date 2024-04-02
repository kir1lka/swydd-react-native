import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="white" //
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.667 19.25v-6.417M3.667 9.167V2.75M11 19.25V11M11 7.333V2.75M18.334 19.25v-4.583M18.334 11V2.75M.917 12.833h5.5M8.25 7.333h5.5M15.584 14.667h5.5"
    />
  </Svg>
);
export default SvgComponent;
