import { Tflite } from 'react-native-tflite'

async function loadModel() {
  try {
    console.log('hi')
    const modelPath = './model2/model.tflite'
    // Initialisieren von Tflite mit dem Pfad zum Modell
    const model = await Tflite.loadModel(modelPath)
    console.log('successful')
    return model
  } catch (error) {
    console.error('Fehler beim Laden', error)
    throw error
  }
}

export default loadModel
