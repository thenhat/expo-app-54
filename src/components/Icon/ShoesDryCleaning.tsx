import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const Icon: React.FC<any> = (props) => {
  const { stroke } = props;
  return (
    <Svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G clipPath="url(#clip0_2671_3323)">
        <Path d="M38.8125 4.5H10.6875C8.09866 4.5 6 6.36548 6 8.66667V42C6 44.3012 8.09866 46.1667 10.6875 46.1667H38.8125C41.4013 46.1667 43.5 44.3012 43.5 42V8.66667C43.5 6.36548 41.4013 4.5 38.8125 4.5Z" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M28.7907 23.2318C27.8787 24.0136 26.7582 24.7432 25.5855 24.7432C23.8396 24.7432 20.3218 24.7432 19.8788 24.7432C19.4358 24.7432 18.1329 25.1862 18.9928 27.3751C19.8006 29.3555 19.3055 31.3099 17.6638 32.6389" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16.4391 33.7593C15.0059 34.4369 14.172 34.5932 14.172 35.2707L19.4358 40.9775C19.4358 40.9775 21.1817 41.8635 22.5107 40.0915C23.8396 38.3456 27.8526 34.1242 29.9633 33.0558C33.4812 31.3099 37.1294 26.8539 35.6701 22.5282C34.3411 18.5674 31.2662 20.7823 29.9633 22.0852" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M33.4813 20.3392C33.4813 20.3392 34.8102 23.4141 32.1523 26.932C29.4943 30.4499 28.6344 30.0069 26.4455 31.7528C25.9504 32.1436 23.2925 34.3325 21.6247 36.5736C20.2958 38.3195 18.0287 39.44 18.0287 39.44" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M23.7355 36.3912C23.3186 36.8603 22.9017 37.3554 22.5368 37.8505C21.2079 39.6485 18.9929 40.5606 18.9929 40.5606" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M34.4715 20.7822C34.4715 20.7822 35.8004 24.3783 33.1425 27.9743C30.4845 31.5704 29.5986 31.1274 27.3836 32.9254C27.097 33.1599 25.9764 34.098 24.7517 35.3228" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M21.6248 24.7432V28.704" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M22.9537 24.7432V27.818" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M24.2826 24.7432V27.3751" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M25.5854 24.7432V26.9321" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M20.9145 9.5C17.6886 14.8226 24.3015 14.0968 20.9145 19.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        <Path d="M28.9145 9.5C25.6886 14.8226 32.3015 14.0968 28.9145 19.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        <Path d="M24.9145 9.5C21.6886 14.8226 28.3015 14.0968 24.9145 19.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_2671_3323">
          <Rect width="40" height="47.3684" fill="white" transform="translate(5 1.5)" />
        </ClipPath>
      </Defs>
    </Svg>

  );
};

const styles = StyleSheet.create({});

export default Icon;
