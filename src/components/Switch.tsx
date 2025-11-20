import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from "react-native-svg";

type SwitchProps = {
  isOn: boolean;
  onToggle: (value: boolean) => void;
};

const SwitchButton = ({ isOn, onToggle }: SwitchProps) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const toggleSwitch = () => {
    onToggle(!isOn);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EDEDED", "#FFF"],
  });

  return (
    <TouchableOpacity
      style={{ width: 52 }}
      onPress={toggleSwitch}
      activeOpacity={0.8}
    >
      <View style={styles.container}>
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <Stop
                offset="0%"
                stopColor="#2F265D"
                stopOpacity={isOn ? 1 : 0}
              />
              <Stop
                offset="100%"
                stopColor="#6350C3"
                stopOpacity={isOn ? 1 : 0}
              />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gradient)"
            rx="16"
            ry="16"
          />
        </Svg>
        <Animated.View style={[styles.childContainer, { backgroundColor }]}>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <Svg width="24" height="24">
              <Defs>
                <LinearGradient
                  id="circleGradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <Stop
                    offset="0%"
                    stopColor="#2F265D"
                    stopOpacity={isOn ? 1 : 0}
                  />
                  <Stop
                    offset="100%"
                    stopColor="#6350C3"
                    stopOpacity={isOn ? 1 : 0}
                  />
                </LinearGradient>
              </Defs>
              <Circle
                cx="12"
                cy="12"
                r="12"
                fill={isOn ? "url(#circleGradient)" : "#FFFFFF"}
              />
            </Svg>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#EDEDED",
  },
  childContainer: {
    width: 48,
    height: 28,
    padding: 2,
    borderRadius: 30,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SwitchButton;
