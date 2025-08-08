import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

type CameraControlsProps = {
  onTakePicture: () => void;
  onPickImage: () => void;
  onToggleCamera: () => void;
  isTakingPicture: boolean;
};

export const CameraControls: React.FC<CameraControlsProps> = ({
  onTakePicture,
  onPickImage,
  onToggleCamera,
  isTakingPicture,
}) => (
  <View style={styles.controlsContainer}>
    <TouchableOpacity
      onPress={onPickImage}
      style={styles.iconButton}
      activeOpacity={0.7}
    >
      <Ionicons name="images" size={32} color="white" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onTakePicture}
      style={styles.captureButton}
      disabled={isTakingPicture}
      activeOpacity={0.8}
    >
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onToggleCamera}
      style={styles.iconButton}
      activeOpacity={0.7}
    >
      <Ionicons
        name="camera-reverse-outline"
        size={36}
        color="white"
      />
    </TouchableOpacity>
  </View>
);