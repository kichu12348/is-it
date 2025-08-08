import React, { useState, useRef, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { CameraView, FlashMode } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import { useCameraPermissions } from "./hooks/useCameraPermissions";
import { useImagePicker } from "./hooks/useImagePicker";
import { CameraControls } from "./CameraControls";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { SettingsSheet } from "./SettingsSheet";
import { QUESTIONS } from "./constants";
import { styles } from "./styles";

const Main = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isImagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [isSettingsSheetVisible, setSettingsSheetVisible] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const [selectedQuestion, setSelectedQuestion] = useState<string>(
    QUESTIONS[0]
  );

  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();
  const { pickImageFromGallery } = useImagePicker(
    setImageUri,
    setImagePreviewVisible
  );

  const takePicture = async () => {
    if (isTakingPicture || !cameraRef.current) return;
    setIsTakingPicture(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        setImageUri(photo.uri);
        setImagePreviewVisible(true);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
      alert("Error taking picture. Please try again.");
    } finally {
      setIsTakingPicture(false);
    }
  };

  const toggleCameraType = () => {
    Haptics.selectionAsync();
    setCameraType((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    Haptics.selectionAsync();
    setFlash((current) => {
      if (current === "off") return "on";
      if (current === "on") return "auto";
      return "off";
    });
  };

  const handleQuestionSelect = (question: string) => {
    Haptics.selectionAsync();
    setSelectedQuestion(question);
    setSettingsSheetVisible(false);
  };

  const renderPermissionRequest = useMemo(
    () => (
      <View style={styles.permissionContainer}>
        <Feather name="camera-off" size={60} color="#888" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          To get started, please grant this app permission to use your camera.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <LinearGradient
            colors={["#5B24E4", "#A23BEE"]}
            style={styles.buttonGradient}
          />
          <Text style={styles.buttonText}>Grant Permission</Text>
          <Ionicons
            name="camera-outline"
            size={22}
            color="white"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    ),
    [requestPermission]
  );

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return renderPermissionRequest;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={cameraType}
        flash={flash}
        zoom={zoom}
        autofocus="on"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "transparent"]}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
          {flash === "on" && <Ionicons name="flash" size={28} color="white" />}
          {flash === "off" && (
            <Ionicons name="flash-off" size={28} color="white" />
          )}
          {flash === "auto" && (
            <MaterialIcons name="flash-auto" size={28} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.questionDisplay}>
          <Text style={styles.questionText}>{selectedQuestion}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setSettingsSheetVisible(true)}
          style={styles.iconButton}
        >
          <Feather name="help-circle" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.zoomContainer}>
          <Text style={styles.zoomText}>1x</Text>
          <Slider
            style={styles.zoomSlider}
            minimumValue={0}
            maximumValue={0.5}
            value={zoom}
            onValueChange={setZoom}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.4)"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.zoomText}>4x</Text>
        </View>
        <CameraControls
          onTakePicture={takePicture}
          onPickImage={pickImageFromGallery}
          onToggleCamera={toggleCameraType}
          isTakingPicture={isTakingPicture}
        />
      </View>
      <ImagePreviewModal
        isVisible={isImagePreviewVisible}
        onClose={() => setImagePreviewVisible(false)}
        imageUri={imageUri}
        insets={insets}
      />
      <SettingsSheet
        isVisible={isSettingsSheetVisible}
        onClose={() => setSettingsSheetVisible(false)}
        questions={QUESTIONS}
        onSelect={handleQuestionSelect}
        insets={insets}
      />
    </View>
  );
};

export default Main;
