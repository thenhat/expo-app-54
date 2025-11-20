import React from "react";
import { Svg, Path } from "react-native-svg";

type SvgComponentProps = {
  color?: string;
  width?: number;
  height?: number;
};

const StoreIcon: React.FC<SvgComponentProps> = ({
  color = "#B8B8B8",
  width = 25,
  height = 24,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4.057 14.31v6.925a.77.77 0 00.77.77h15.39a.77.77 0 00.77-.77v-6.926M14.059 14.31v7.694M4.057 16.624H14.06M2.52 7.387L4.83 2h15.39l2.308 5.387H2.521z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.059 7.387v1.539a3.078 3.078 0 01-3.078 3.078H5.55a3.078 3.078 0 01-3.078-3.078v-1.54"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.983 7.387v1.539a3.078 3.078 0 01-3.078 3.078h-.77a3.078 3.078 0 01-3.077-3.078v-1.54M22.528 7.387v1.539a3.078 3.078 0 01-3.078 3.078h-.385a3.078 3.078 0 01-3.078-3.078v-1.54"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StoreIcon;
