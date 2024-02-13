import * as tf from '@tensorflow/tfjs'

async function loadModelHelper() {
  const model = await tf.loadLayersModel('server/model_architecture.json')
}

export default loadModelHelper
