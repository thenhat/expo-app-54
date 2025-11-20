import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

interface Props {
  size?: number;
  color?: string;
  speed?: number;
}

const DotLoading = ({ size = 43, color = "#2F265D", speed = 0.3 }: Props) => {
  const dotSize = size * 0.24;
  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const scale3 = useRef(new Animated.Value(0)).current;

  // Animation for scaling effect from 0 to 1, then back to 0
  const startAnimation = (scale: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: speed * 1000, // total duration
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: speed * 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    // Start animation for each dot with increasing delay for sequential effect
    startAnimation(scale1);
    setTimeout(() => startAnimation(scale2), 200); // Delay the second dot
    setTimeout(() => startAnimation(scale3), 400); // Delay the third dot
  }, [scale1, scale2, scale3]);

  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: dotSize,
        width: size,
        flexDirection: "row",
      }}
    >
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          transform: [{ scale: scale1 }],
        }}
      />
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          transform: [{ scale: scale2 }],
        }}
      />
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          transform: [{ scale: scale3 }],
        }}
      />
    </View>
  );
};

export default DotLoading;
