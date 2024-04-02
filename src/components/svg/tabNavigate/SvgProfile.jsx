import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgFavorite = ({ color }) => (
  // <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={23} fill="none">
  //   <Path
  //     fill={color}
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M11.117 12.26a.934.934 0 0 0-.234 0 3.187 3.187 0 0 1-3.081-3.188A3.194 3.194 0 0 1 11 5.874a3.194 3.194 0 0 1 .117 6.386ZM17.571 18.695A9.686 9.686 0 0 1 11 21.25a9.686 9.686 0 0 1-6.572-2.555c.098-.916.683-1.813 1.726-2.515 2.671-1.774 7.04-1.774 9.692 0 1.043.702 1.628 1.599 1.725 2.515Z"
  //   />
  //   <Path
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M11 21.25c5.385 0 9.75-4.365 9.75-9.75S16.385 1.75 11 1.75 1.25 6.115 1.25 11.5s4.365 9.75 9.75 9.75Z"
  //   />
  // </Svg>

  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={23} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.117 12.26a.934.934 0 0 0-.234 0 3.187 3.187 0 0 1-3.081-3.188A3.194 3.194 0 0 1 11 5.874a3.194 3.194 0 0 1 .117 6.386ZM17.571 18.695A9.686 9.686 0 0 1 11 21.25a9.686 9.686 0 0 1-6.572-2.555c.098-.916.683-1.813 1.726-2.515 2.671-1.774 7.04-1.774 9.692 0 1.043.702 1.628 1.599 1.725 2.515Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 21.25c5.385 0 9.75-4.365 9.75-9.75S16.385 1.75 11 1.75 1.25 6.115 1.25 11.5s4.365 9.75 9.75 9.75Z"
    />
  </Svg>
);
export default SvgFavorite;
