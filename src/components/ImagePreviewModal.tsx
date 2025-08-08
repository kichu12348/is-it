import React from "react";
import {
  Modal,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

type ImagePreviewModalProps = {
  isVisible: boolean;
  onClose: () => void;
  imageUri: string | null;
  insets: { top: number; bottom: number };
};

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isVisible,
  onClose,
  imageUri,
  insets,
}) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    onRequestClose={onClose}
    transparent
  >
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.modalImageBackground}
      resizeMode="contain"
    >
      <View style={styles.modalContentContainer}>
        <View style={[styles.modalHeader, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.modalFooter, { paddingBottom: insets.bottom + 10 }]}
        >
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Analyze Image</Text>
            <MaterialCommunityIcons
              name="image-search-outline"
              size={22}
              color="white"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </Modal>
);
