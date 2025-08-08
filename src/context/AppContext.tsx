import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as tf from "@tensorflow/tfjs";
import { init, loadModel, getPrediction } from "../brain";


interface AppContextType {
  analyzeImage: (uri: string) => Promise<void>;
  isLoading: boolean;
  isAnalyzing: boolean;
  prediction: number[] | null; 
  clearPrediction: () => void; 
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false); 
  const [prediction, setPrediction] = useState<number[] | null>(null); 

  useEffect(() => {
    const setup = async () => {
      try {
        await init();
        const loadedModel = await loadModel();
        setModel(loadedModel);
        console.log("✅ Model loaded successfully!");
      } catch (e) {
        console.error("❌ Failed to load model", e);
      } finally {
        setIsLoading(false); 
      }
    };
    setup();
  }, []);

  const analyzeImage = async (uri: string) => {
    if (!model) {
      console.warn("Model not loaded yet, please wait.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const predictionResult = await getPrediction(uri, model);
      console.log("🧠 Prediction Result:", predictionResult);
      setPrediction(predictionResult as number[]);
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };


  const clearPrediction = () => {
    setPrediction(null);
  };

  const value = {
    analyzeImage,
    isLoading,
    isAnalyzing,
    prediction,
    clearPrediction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};