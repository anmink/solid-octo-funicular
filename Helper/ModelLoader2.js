import * as tf from '@tensorflow/tfjs'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'

// Function to load the model
async function loadModel() {
  await tf.ready()
  const modelJson = require('./model/model.json')
  const modelWeights = [
    require('./model/weights1.bin'),
    require('./model/weights2.bin'),
    require('./model/weights3.bin'),
    require('./model/weights4.bin'),
    require('./model/weights5.bin'),
    require('./model/weights6.bin'),
    require('./model/weights7.bin'),
  ]

  const model = await tf.loadGraphModel(
    bundleResourceIO(modelJson, modelWeights)
  )
  return model
}

export default loadModel
