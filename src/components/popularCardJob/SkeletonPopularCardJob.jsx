import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import { View } from "react-native";

const SkeletonPopularCardJob = (props) => (
  <ContentLoader
    speed={2}
    width={160}
    height={70}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect rx="10" ry="10" width="160" height="70" />
  </ContentLoader>
);

export default SkeletonPopularCardJob;
