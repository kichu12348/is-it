import React from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

type SettingsSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  questions: string[];
  onSelect: (question: string) => void;
  insets: { bottom: number };
};

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  isVisible,
  onClose,
  questions,
  onSelect,
  insets,
}) => (
  <Modal
    visible={isVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <Pressable style={styles.sheetOverlay} onPress={onClose}>
      <Pressable style={[styles.sheetContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>Select a Question</Text>
        <FlatList
          data={questions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.sheetOptionText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </Pressable>
    </Pressable>
  </Modal>
);