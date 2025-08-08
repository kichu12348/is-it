import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "./src/components/loadingScreen"; 
import Main from "./src/components/Main";
import { AppProvider, useAppContext } from "./src/context/AppContext";

/**
 * A component that consumes the AppContext to decide what to render.
 */
const AppContent = () => {
  const { isLoading } = useAppContext();

  // If the model is loading or an image is being analyzed, show the loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Otherwise, show the main application interface
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