import React from "react";
import { Svg, Path } from "react-native-svg";

type MyIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const MyIcon: React.FC<MyIconProps> = ({
  color = "#B8B8B8",
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M20 21.002v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11.002a4 4 0 100-8 4 4 0 000 8z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MyIcon;
