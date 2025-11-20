import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  const { stroke } = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M39.0625 4.16663H10.9375C8.34866 4.16663 6.25 6.03211 6.25 8.33329V41.6666C6.25 43.9678 8.34866 45.8333 10.9375 45.8333H39.0625C41.6513 45.8333 43.75 43.9678 43.75 41.6666V8.33329C43.75 6.03211 41.6513 4.16663 39.0625 4.16663Z" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M25 39.7221C30.753 39.7221 35.4167 35.0584 35.4167 29.3055C35.4167 23.5525 30.753 18.8888 25 18.8888C19.2471 18.8888 14.5834 23.5525 14.5834 29.3055C14.5834 35.0584 19.2471 39.7221 25 39.7221Z" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13 9H13.0208" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19.5278 9H19.5487" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M25.0834 9H25.1042" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="7.1" y1="12.9" x2="42.9" y2="12.9" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M20.9145 24C17.6886 29.3226 24.3015 28.5968 20.9145 34" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M28.9145 24C25.6886 29.3226 32.3015 28.5968 28.9145 34" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M24.9145 24C21.6886 29.3226 28.3015 28.5968 24.9145 34" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>

  );
};

const styles = StyleSheet.create({});

export default Icon;
