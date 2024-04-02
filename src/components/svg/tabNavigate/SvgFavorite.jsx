import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFavorite = ({ color }) => (
  // <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={21} fill="none">
  //   <Path
  //     fill={color}
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M11.62 19.409c-.34.121-.9.121-1.24 0C7.48 18.408 1 14.232 1 7.153 1 4.028 3.49 1.5 6.56 1.5c1.82 0 3.43.89 4.44 2.265A5.51 5.51 0 0 1 15.44 1.5C18.51 1.5 21 4.028 21 7.153c0 7.079-6.48 11.255-9.38 12.256Z"
  //   />
  // </Svg>

  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={21} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.62 19.409c-.34.121-.9.121-1.24 0C7.48 18.408 1 14.232 1 7.153 1 4.028 3.49 1.5 6.56 1.5c1.82 0 3.43.89 4.44 2.265A5.51 5.51 0 0 1 15.44 1.5C18.51 1.5 21 4.028 21 7.153c0 7.079-6.48 11.255-9.38 12.256Z"
    />
  </Svg>
);
export default SvgFavorite;
