import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as tf from '@tensorflow/tfjs';
import { init, loadModel, getPrediction } from '../brain';

// Define the shape of the context data
interface AppContextType {
  analyzeImage: (uri: string) => Promise<void>;
  isLoading: boolean;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provider component that wraps the app and manages model loading and analysis state.
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initially true for model loading

  // Effect to initialize TensorFlow and load the model on mount
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
        setIsLoading(false); // Hide initial loading screen
      }
    };
    setup();
  }, []);

  /**
   * Takes an image URI, runs it through the model, and logs the prediction.
   * @param uri - The local URI of the image to analyze.
   */
  const analyzeImage = async (uri: string) => {
    if (!model) {
      console.warn("Model not loaded yet, please wait.");
      return;
    }
    // The loading state is no longer set here, so the loading screen won't show during analysis.
    try {
      const prediction = await getPrediction(uri, model);
      console.log("🧠 Prediction Result:", prediction);
    } catch (error) {
      console.error("Error during analysis:", error);
    }
  };

  const value = {
    analyzeImage,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to easily access the App context data.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};