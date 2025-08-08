import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ColorValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');


const images = [
  require('../assets/biryani.png'),
  require('../assets/food.png'),
  require('../assets/chair.png'),
  require('../assets/selfie.png'),
];

const gradients = [
  ['#FFB347', '#FF774D'], // Orange/Red for Biryani
  ['#FF6F61', '#FFC371'], // Coral/Gold for Food
  ['#8B5E3C', '#D2B48C'], // Brown/Tan for Chair
  ['#9D50BB', '#6E48AA'], 
];

const captions = [
  'Consulting MasterChef...',
  'Analyzing flavor profiles...',
  'Measuring chair stability...',
  'Finding your best angle...',
];

// --- COMPONENT ---
export default function LoadingScreen() {
  // Use shared value for continuous animations on the UI thread
  const progress = useSharedValue(0);
  
  // Use state for discrete changes that require a re-render
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Start the continuous pulsing/progress bar animation
    // Loops from 0 to 1 and back, forever.
    progress.value = withRepeat(withTiming(1, { duration: 1600 }), -1, true);

    // Set up an interval to change the image, gradient, and caption
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change every 2 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once

  // Animated style for the pulsing image
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.95, 1.05]);
    return {
      transform: [{ scale }],
    };
  });

  // Animated style for the progress bar fill
  const progressBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={gradients[currentIndex] as [ColorValue, ColorValue]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Animated Image */}
      {/* The `key` prop forces a re-mount when the index changes, creating a clean swap */}
      <Animated.Image
        key={currentIndex}
        source={images[currentIndex]}
        style={[styles.image, imageAnimatedStyle]}
        resizeMode="contain"
      />

      {/* Caption Text */}
      <Text style={styles.caption}>{captions[currentIndex]}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, progressBarAnimatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
  },
  caption: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  progressBarBackground: {
    height: 8,
    width: width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden', 
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});