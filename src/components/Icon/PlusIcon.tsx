import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  return (
    <Svg viewBox="0 0 20 20" {...props}>
      <Path
        d="M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z"
        stroke="#BCBCBC"
        fill='transparent'
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 6V14"
        stroke="#BCBCBC"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 10H14"
        stroke="#BCBCBC"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default Icon;
