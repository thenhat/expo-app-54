import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        d="M19 5L5 19"
        stroke="#B8B8B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 5L19 19"
        stroke="#B8B8B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default Icon;
