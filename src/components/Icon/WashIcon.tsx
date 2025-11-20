import React from "react";
import { Svg, Path } from "react-native-svg";

type SvgComponentProps = {
  color?: string;
  width?: number;
  height?: number;
};

const WashIcon: React.FC<SvgComponentProps> = ({
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
        d="M18.75 2.002H5.25c-1.243 0-2.25.896-2.25 2v16c0 1.105 1.007 2 2.25 2h13.5c1.243 0 2.25-.895 2.25-2v-16c0-1.104-1.007-2-2.25-2z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18.002a5 5 0 100-10 5 5 0 000 10zM7 5.002h.01M10 5.002h.01"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.648 11.002L10 12.354"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default WashIcon;
