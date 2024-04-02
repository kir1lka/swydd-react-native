import React from "react";
import { Svg, Path } from "react-native-svg";

const SvgLock = (props) => (
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
      d="M19 11.685H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2ZM7 11.685v-4a5 5 0 1 1 10 0v4"
    />
  </Svg>
);

export default SvgLock;
