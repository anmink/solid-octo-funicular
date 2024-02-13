import * as tf from '@tensorflow/tfjs'
import * as FileSystem from 'expo-file-system';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'
import { inflate } from 'pako';

const modelJson = require('./model3/modeljs/model.json')
const weights = ['weight1.bin', 'weight2.bin', 'weight3.bin']; // add all your .bin files to this array

const loadWeights = async () => {
  const weightFiles = await Promise.all(weights.map(weight => FileSystem.readAsArrayBufferAsync(`./model3/modeljs/${weight}`)));
  const compressedWeights = weightFiles.map(weightFile => new Uint8Array(weightFile));
  const decompressedWeights = compressedWeights.map(compressedWeight => inflate(compressedWeight));
  return decompressedWeights.flat();
}

export const getModel = async () => {
  try {
    // wait until tensorflow is ready
    await tf.ready()
    // load the trained model weights
    const weightsArrayBuffer = await loadWeights();
    const modelWeights = new Uint8Array(weightsArrayBuffer);
    // load the trained model
    return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
  } catch (error) {
    console.log('Could not load model', error)
  }
}