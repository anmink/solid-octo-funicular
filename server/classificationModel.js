import * as tf from '@tensorflow/tfjs'

async function loadModelHelper() {
  try {
    const model = await tf.loadLayersModel('file:///path/to/model.json')
    console.log('Model loaded successfully.')
  } catch (error) {
    console.error('Error loading or using Tensorflow model:', error)
  }

  // Load the converted model.
  const model = await tf.loadLayersModel('server/model_architecture.json')

  // Preprocess the input data.
  const image = new Image()
  image.src = 'server/output.png'
  image.onload = async () => {
    const tensor = tf.browser.fromPixels(image)
    const resized = tf.image.resizeBilinear(tensor, [224, 224])
    const normalized = tf.image.perImageStandardization(resized)
    const input = normalized.expandDims()

    // Make predictions.
    const prediction = model.predict(input)
    const color = prediction.dataSync()[0]
    const type = prediction.dataSync()[1]
    console.log(`The color of the object is ${color} and the type is ${type}.`)
  }
}

export default loadModelHelper
