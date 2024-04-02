import React from "react";
import { Svg, Path } from "react-native-svg";

const SvgUser = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      opacity={0.4}
      d="M20 21.685v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11.685a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </Svg>
);

export default SvgUser;
