import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgShareDetails = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#0B0B0B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.5 7.333a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM5.5 13.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM16.5 20.167a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM7.874 12.384l6.26 3.649M14.126 5.968 7.874 9.616"
    />
  </Svg>
);
export default SvgShareDetails;
