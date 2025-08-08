import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "./src/components/loadingScreen";
import Main from "./src/components/Main";
import { AppProvider, useAppContext } from "./src/context/AppContext";
import * as Updates from "expo-updates";
import { useEffect } from "react";

const AppContent = () => {
  const { isLoading, isAnalyzing } = useAppContext();

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        if(__DEV__) return;
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.error("Error checking for updates:", e);
      }
    };

    checkForUpdates();
  }, []);
  if (isLoading || isAnalyzing) {
    return <LoadingScreen />;
  }
  return <Main />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}