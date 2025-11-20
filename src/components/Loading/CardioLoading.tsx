import React, { useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  lineColor?: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CardioLoading = ({
  size = 40,
  color = "#2F265D",
  lineColor = "rgba(0,0,0,0.1)",
}: Props) => {
  // Animation states
  const pathRef = useRef<Path | null>(null);
  const dashoffset = useRef(new Animated.Value(100)).current;

  // Opacity interpolation
  const opacity = dashoffset.interpolate({
    inputRange: [0, 20, 50, 100],
    outputRange: [1, 1, 1, 0],
  });

  // Start the animations
  React.useEffect(() => {
    const travelAnimation = Animated.loop(
      Animated.timing(dashoffset, {
        toValue: 0,
        duration: 1750,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    );

    travelAnimation.start();
  }, [dashoffset]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Svg
        height={size}
        width={size * 1.25}
        viewBox="0 0 50 31.25"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <Path
          ref={pathRef}
          strokeWidth={4}
          fill="none"
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          stroke={lineColor} // Faint track line
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

export default CardioLoading;
