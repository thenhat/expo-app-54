import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  return (
    <Svg viewBox="0 0 50 50" width="50" height="50" {...props}>
      <Path
        d="M39.0625 4.16663H10.9375C8.34866 4.16663 6.25 6.03211 6.25 8.33329V41.6666C6.25 43.9678 8.34866 45.8333 10.9375 45.8333H39.0625C41.6513 45.8333 43.75 43.9678 43.75 41.6666V8.33329C43.75 6.03211 41.6513 4.16663 39.0625 4.16663Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={"transparent"}
      />
      <Path
        d="M25 39.7221C30.7529 39.7221 35.4166 35.0584 35.4166 29.3055C35.4166 23.5525 30.7529 18.8888 25 18.8888C19.247 18.8888 14.5833 23.5525 14.5833 29.3055C14.5833 35.0584 19.247 39.7221 25 39.7221Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={"transparent"}
      />
      <Path
        d="M13 9H13.0208"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5278 9H19.5487"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25.0834 9H25.1042"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25.5555 24.4445L18.8889 29.4824"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M28.9898 26.6666L25.5556 29.4824"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Line
        x1="7.1"
        y1="12.9"
        x2="42.9"
        y2="12.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({

  
});

export default Icon;

