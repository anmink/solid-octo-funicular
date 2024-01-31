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

import loadModelHelper from '../server/classificationModel'

export default function Prediction({ route, navigation }) {
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelData, setModelData] = useState()
  const [article, setArticle] = useState()
  const [color, setColor] = useState()
  const [season, setSeason] = useState()
  const [stil, setStil] = useState()

  useEffect(() => {
    async function loadModel() {
      try {
        const model = await loadModelHelper
        setModelLoaded(true)
        console.log('Model loaded successfully.')
      } catch (error) {
        console.error('Error loading or using Tensorflow model:', error)
      }
    }

    loadModel()
  }, [])
  //const image = new Image()
  const prediction = () => {
    const image = '../server/output2.png'
    image.onload = async () => {
      const tensor = tf.browser.fromPixels(image)
      const resized = tf.image.resizeBilinear(tensor, [224, 224])
      const normalized = tf.image.perImageStandardization(resized)
      const input = normalized.expandDims()

      // Make predictions.
      const prediction = model.predict(input)
      const color = prediction.dataSync()[0]
      const type = prediction.dataSync()[1]
      console.log(
        `The color of the object is ${color} and the type is ${type}.`
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        {modelLoaded ? 'Model loaded successfully' : 'Loading model...'}
      </Text>
      <Button title="Prediction" onPress={() => prediction()} />
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
