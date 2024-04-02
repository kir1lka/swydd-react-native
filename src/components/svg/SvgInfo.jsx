import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgInfo = ({ color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
    <Path
      fill={color}
      d="M11 0C4.925 0 0 4.927 0 11c0 6.076 4.925 11 11 11s11-4.924 11-11c0-6.073-4.925-11-11-11Zm0 4.879a1.863 1.863 0 1 1 0 3.726 1.863 1.863 0 0 1 0-3.726Zm2.484 11.266a.532.532 0 0 1-.532.532H9.048a.532.532 0 0 1-.532-.532v-1.064c0-.294.238-.533.532-.533h.533V11.71h-.533a.532.532 0 0 1-.532-.533v-1.064c0-.294.238-.532.532-.532h2.84c.293 0 .531.238.531.532v4.435h.533c.294 0 .532.239.532.533v1.064Z"
    />
  </Svg>
);
export default SvgInfo;
