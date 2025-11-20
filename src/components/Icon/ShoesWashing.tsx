import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  const { stroke } = props;
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M39.0625 4.16663H10.9375C8.34866 4.16663 6.25 6.03211 6.25 8.33329V41.6666C6.25 43.9678 8.34866 45.8333 10.9375 45.8333H39.0625C41.6513 45.8333 43.75 43.9678 43.75 41.6666V8.33329C43.75 6.03211 41.6513 4.16663 39.0625 4.16663Z" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13 9H13.0208" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19.5278 9H19.5487" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M25.0834 9H25.1042" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="7.1" y1="12.9" x2="42.9" y2="12.9" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M32.8292 28.5679C31.6058 28.0972 30.3246 27.3992 29.7169 26.2731C28.8123 24.5965 26.9894 21.2182 26.7599 20.7928C26.5304 20.3674 25.4298 19.3457 23.7734 21.3057C22.2901 23.1076 20.1567 23.6449 18.0298 22.757" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16.3191 22.1614C14.9258 21.1361 14.3436 20.4163 13.693 20.7674L10.9402 28.7793C10.9402 28.7793 10.994 30.9151 13.3843 31.2731C15.7495 31.6447 21.8829 33.311 24.0026 34.7844C27.502 37.258 33.6715 38.4525 37.0694 34.8097C40.1845 31.4811 36.4641 29.676 34.5378 29.0999" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M38.0375 31.5737C38.0375 31.5737 35.7733 34.4432 31.0177 33.7136C26.2622 32.9839 26.242 31.9286 23.4312 30.7312C22.7993 30.4583 19.32 29.04 16.3037 28.5997C13.9385 28.2281 11.6877 26.6316 11.6877 26.6316" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.5723 30.5321C16.9058 30.3747 16.2143 30.2309 15.5498 30.1371C13.1345 29.7925 11.111 28.1381 11.111 28.1381" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M38.1251 32.7541C38.1251 32.7541 35.3603 35.8937 30.5297 35.2046C25.6991 34.5154 25.6654 33.4351 22.7911 32.2397C22.4173 32.0859 20.9358 31.496 19.1251 30.9544" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M27.6647 22.4695L23.861 24.5219" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28.3533 23.7456L25.4004 25.3389" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M29.0419 25.0219L26.5144 26.3856" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M29.7169 26.2731L27.6149 27.4073" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default Icon;
