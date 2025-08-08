import * as tf from "@tensorflow/tfjs";
import { decodeJpeg, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

const init = async () => {
  await tf.ready();
  try {
    await tf.setBackend("rn-webgl");
  } catch (err) {
    console.warn("TensorFlow initialization error:", err);
    await tf.setBackend("cpu");
  }
};

const loadModel = async (
  modelUrl: string,
  cb?: (progress: number) => void
): Promise<tf.LayersModel> => {
  const model = await tf.loadLayersModel(modelUrl, {
    onProgress: cb,
  });

  return model;
};

async function transformImageToTensor(uri: string) {
  const img64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
  const raw = new Uint8Array(imgBuffer);
  let imgTensor = decodeJpeg(raw);
  const scalar = tf.scalar(255);

  imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [224, 224]);
  const tensorScaled = imgTensor.div(scalar);

  const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);
  return img;
}

async function predict(model: tf.LayersModel, imageTensor: tf.Tensor) {
  if (!model) {
    throw new Error("Model is not loaded");
  }
  const prediction = model.predict(imageTensor);

  let pred;
  if (Array.isArray(prediction)) {
    pred = prediction.map((tensor) => tensor.dataSync());
    prediction.forEach((tensor) => tensor.dispose());
  } else {
    pred = prediction.dataSync();
    prediction.dispose();
  }

  return pred;
}

async function getPrediction(uri: string, model: tf.LayersModel) {
  try {
    const imageTensor = await transformImageToTensor(uri);
    const prediction = await predict(model, imageTensor);

    tf.dispose(imageTensor);

    return prediction;
  } catch (error) {
    console.error("Error in prediction:", error);
    throw error;
  }
}

export { init, loadModel, getPrediction };
