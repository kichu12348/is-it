import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export const useImagePicker = (
  setImageUri: (uri: string) => void,
  setImagePreviewVisible: (visible: boolean) => void
) => {
  const pickImageFromGallery = async () => {
    Haptics.selectionAsync();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('We need access to your photos to do this!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImagePreviewVisible(true);
    }
  };

  return { pickImageFromGallery };
};