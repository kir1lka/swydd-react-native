import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const SkeletonJobScreen = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="15" y="3" rx="5" ry="5" width="300" height="40" />
    <Rect x="15" y="55" rx="5" ry="5" width="300" height="40" />
    <Rect x="15" y="110" rx="5" ry="5" width="345" height="100" />
  </ContentLoader>
);

export default SkeletonJobScreen;
