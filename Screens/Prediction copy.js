import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { decodeJpeg } from '@tensorflow/tfjs-react-native'
import axios from 'axios'

import loadModel from '../Helper/ModelLoader'

export default function Prediction({ route, navigation }) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelData, setModelData] = useState()
  const [article, setArticle] = useState()
  const [color, setColor] = useState()
  const [season, setSeason] = useState()
  const [stil, setStil] = useState()
  const { image } = route.params

  useEffect(() => {
    const loadImageClassificationModel = async () => {
      try {
        const model = await loadModel()
        setModelData(model)
        setModelLoaded(true)
      } catch (error) {
        console.error('Error loading or using TensorFlow model:', error)
      }
    }

    loadImageClassificationModel()
  }, [])

  const loadUserImage = async (imageFile) => {
    console.log('preprocessing function: preprocessing is working')
    // Load the image data from the URI
    const imageUri = imageFile
    const response = await axios.get(
      imageUri,
      { responseType: 'arraybuffer' },
      { isBinary: true }
    )
    const imageDataArrayBuffer = await response.data
    const imageData = new Uint8Array(imageDataArrayBuffer)
    const imageTensor = decodeJpeg(imageData)

    // Resize and normalize the image
    const desiredWidth = 224
    const desiredHeight = 224
    const resizedTensor = tf.image.resizeBilinear(imageTensor, [
      desiredHeight,
      desiredWidth,
    ])
    const normalizedTensor = tf.div(resizedTensor, 255)
    const expandedTensor = normalizedTensor.expandDims(0)
    console.log('finally done loadUser Image')
    return expandedTensor
  }

  const predict = async (imageFile) => {
    try {
      //const preprocessingImage = await preprocessImage(imageFile, imageDims)
      //const userImage = loadUserImage(imageFile)
      console.log('Prediction function: preprocessing is working')
      const inputData = await loadUserImage(imageFile)
      console.log('prediction is working')
      const predictions = await modelData.predict(inputData)
      console.log('prediction finished, waiting for output', predictions)

      const articleTypeLabels = [
        'Casual Shoes',
        'Other',
        'Shirts',
        'Tshirts',
        'Watches',
      ]
      const baseColourLabels = [
        'Black',
        'Blue',
        'Brown',
        'Green',
        'Grey',
        'Other',
        'Pink',
        'Red',
        'White',
      ]
      const seasonLabels = ['Fall', 'Spring', 'Summer', 'Winter']
      const usageLabels = ['Casual', 'Ethnic', 'Formal', 'Other', 'Sports']

      const articleTypeIndex = tf.argMax(predictions[0], 1).dataSync()[0]
      const baseColourIndex = tf.argMax(predictions[2], 1).dataSync()[0]
      const seasonIndex = tf.argMax(predictions[3], 1).dataSync()[0]
      const usageIndex = tf.argMax(predictions[4], 1).dataSync()[0]

      const articleType = articleTypeLabels[articleTypeIndex]
      const baseColour = baseColourLabels[baseColourIndex]
      const season = seasonLabels[seasonIndex]
      const usage = usageLabels[usageIndex]

      setArticle(articleType)
      setColor(baseColour)
      setSeason(season)
      setStil(usage)

      console.log('Article Type:', articleType)
      console.log('Base Colour:', baseColour)
      console.log('Season:', season)
      console.log('Usage:', usage)
    } catch (error) {
      console.error('Error predicting with the TensorFlow.js model:', error)
      return null
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        {modelLoaded ? 'Model loaded successfully' : 'Loading model...'}
      </Text>
      <Button title="Preprocess image" onPress={() => predict(image.uri)} />

      <Button title="Preprocess 1.0" onPress={() => loadUserImage(image.uri)} />
      <Text>in a few seconds you see the prediction</Text>
      <Image
        style={{
          width: 300,
          height: 500,
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{ uri: image.uri }}
      />
      <Text>{article}</Text>
      <Text>{color}</Text>
      <Text>{stil}</Text>
      <Text>{season}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
