import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./src/components/loadingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./src/components/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <LoadingScreen /> */}
      <Main />
    </SafeAreaProvider>
  );
}
