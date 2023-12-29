import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

async function loadModel() {
  try {
    await tf.ready()
    const model = await mobilenet.load()
    return model
  } catch (error) {
    console.error('Fehler beim Laden des Modells:', error)
    throw error
  }
}

export default loadModel
