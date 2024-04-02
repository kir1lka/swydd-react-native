import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

import { View } from "react-native";

const SkeletonJobCard = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={160}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect rx="10" ry="10" width="100%" height="160" />
  </ContentLoader>
);

export default SkeletonJobCard;
