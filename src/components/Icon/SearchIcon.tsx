import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  return (
    <Svg viewBox="0 0 17 17" {...props}>
      <Path
        d="M7.66667 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66667C14.3333 3.98477 11.3486 1 7.66667 1C3.98477 1 1 3.98477 1 7.66667C1 11.3486 3.98477 14.3333 7.66667 14.3333Z"
        stroke="#2F265D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill='transparent'

      />
      <Path
        d="M16 15.9999L12.375 12.3749"
        stroke="#2F265D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default Icon;
