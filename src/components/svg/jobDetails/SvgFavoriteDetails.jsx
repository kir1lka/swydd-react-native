import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFavoriteDetails = ({ fill, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={20}
    fill={fill ? color : "none"}
  >
    <Path
      stroke={color ? color : "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.62 18.909c-.34.121-.9.121-1.24 0C7.48 17.908 1 13.732 1 6.653 1 3.528 3.49 1 6.56 1c1.82 0 3.43.89 4.44 2.265A5.51 5.51 0 0 1 15.44 1C18.51 1 21 3.528 21 6.653c0 7.079-6.48 11.255-9.38 12.256Z"
    />
  </Svg>
);
export default SvgFavoriteDetails;
