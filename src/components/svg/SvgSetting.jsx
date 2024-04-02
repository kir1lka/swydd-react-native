import React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

const SvgSetting = ({ color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none">
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.559.822h24v24h-24z" />
      </ClipPath>
    </Defs>
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M12.559 15.822a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <Path d="M19.959 15.822a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-1.415 3.417 2.001 2.001 0 0 1-1.415-.587l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51v.17a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2.002 2.002 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1h-.17a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51v-.17a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 3.264.65 1.999 1.999 0 0 1-.434 2.18l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1h.17a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </G>
  </Svg>
);
export default SvgSetting;
