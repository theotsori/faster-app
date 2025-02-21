import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Animated } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  size = 200,
  progress = 0,
  strokeWidth = 10,
  progressColor = '#00ff87',
  backgroundColor = 'rgba(255,255,255,0.2)',
  children,
  rotation = -90,
}) => {
  // Calculate dimensions
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated progress value for smooth transitions
  const animatedProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false, // Animated SVG properties require useNativeDriver false
    }).start();
  }, [progress]);

  // Interpolate animated value to calculate the strokeDashoffset
  const animatedDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G rotation={rotation} origin={`${center}, ${center}`}>
          {/* Background Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={animatedDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {/* Center Content */}
      <View style={[StyleSheet.absoluteFill, styles.contentContainer]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularProgress;
