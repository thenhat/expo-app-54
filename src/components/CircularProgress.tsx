import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
const PlaceholderImage = require("@/assets/images/img-laundry.png");

const CircularProgress = ({ size = 150, strokeWidth = 6, progress = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={PlaceholderImage}
        style={[styles.image, { width: size - strokeWidth * 2, height: size - strokeWidth * 2 }]}
      />

      {/* SVG cho Circular Progress */}
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="48.96%" stopColor="#FFFFFF" stopOpacity="1" />
            <Stop offset="94.92%" stopColor="#6351BC" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Vòng tròn nền */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFFFFF4D"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Vòng tròn progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="butt"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    borderRadius: 100, // Đảm bảo ảnh tròn
    position: 'absolute',
  },
  svg: {
    position: 'absolute',
  },
});

export default CircularProgress;