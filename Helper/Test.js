import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-react-native'
import { Image } from 'react-native'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'

// Load the model
const loadModel = async () => {
  await tf.ready()
  const modelJson = require('../assets/model/model.json')
  const modelWeights = [
    require('../assets/model/weights1.bin'),
    require('../assets/model/weights2.bin'),
    require('../assets/model/weights3.bin'),
    require('../assets/model/weights4.bin'),
    require('../assets/model/weights5.bin'),
    require('../assets/model/weights6.bin'),
    require('../assets/model/weights7.bin'),
  ]

  const model = await tf.loadGraphModel(
    bundleResourceIO(modelJson, modelWeights)
  )
  return model
}

// Perform predictions with the model
const performPredictions = async (model, userImage) => {
  // Preprocess the user's image if required
  const preprocessedImage = preprocessImage(userImage)

  // Perform predictions
  const predictions = model.predict(preprocessedImage)

  // Process the predictions and obtain the label results
  const articleTypeLabel = processArticleType(predictions[0])
  const genderLabel = processGender(predictions[1])
  const baseColourLabel = processBaseColour(predictions[2])
  const seasonLabel = processSeason(predictions[3])
  const usageLabel = processUsage(predictions[4])

  // Print the label results or use them as desired
  console.log('Article Type:', articleTypeLabel)
  console.log('Gender:', genderLabel)
  console.log('Base Colour:', baseColourLabel)
  console.log('Season:', seasonLabel)
  console.log('Usage:', usageLabel)
}

// Load the model and perform predictions
const loadModelAndPredict = async () => {
  // Load the local image using the appropriate file path
  const localImagePath = '../assets/09.png'
  const userImage = Image.resolveAssetSource(localImagePath)

  // Load the model
  const model = await loadModel()

  // Perform predictions with the model and user's image
  await performPredictions(model, userImage)
}

// Call the function to load the model and perform predictions
loadModelAndPredict()
