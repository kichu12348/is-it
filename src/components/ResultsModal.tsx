import React from "react";
import {
  Modal,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { QUESTIONS } from "./constants";

type ResultsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  imageUri: string | null;
  prediction: number[] | null;
  question: string;
  insets: { top: number; bottom: number };
};

const getResultContent = (prediction: number[], question: string) => {
  const questionIndex = QUESTIONS.indexOf(question);
  if (questionIndex === -1 || !prediction) {
    return { title: "Hmm...", subtitle: "Couldn't analyze the result." };
  }

  const confidence = prediction[questionIndex];
  const confidencePercent = (confidence * 100).toFixed(0);

  if (confidence > 0.5) {
    return {
      title: "YES!",
      subtitle: `I'm about ${confidencePercent}% sure.`,
    };
  } else {
    return {
      title: "NOPE!",
      subtitle: `I'm about ${100 - Number(confidencePercent)}% sure this isn't.`,
    };
  }
};

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isVisible,
  onClose,
  imageUri,
  prediction,
  question,
  insets,
}) => {
  const result =
    prediction && getResultContent(prediction, question);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
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
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>{result?.title}</Text>
            <Text style={styles.resultSubtitle}>{result?.subtitle}</Text>
          </View>
          <View
            style={[styles.modalFooter, { paddingBottom: insets.bottom + 10 }]}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Try Again</Text>
              <Ionicons
                name="refresh-outline"
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
};