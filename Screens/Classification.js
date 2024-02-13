import React, { useEffect, useState } from 'react'
import { Text, View, Button } from 'react-native'
import { getModel } from '../Helper/ModelLoader2'

const ModelLoadingComponent = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [modelData, setModelData] = useState()

  useEffect(() => {
    const modelLoading = async () => {
      try {
        const model = await getModel()
        setIsModelLoaded(true)
        console.log('successful')
        return model
      } catch (error) {
        console.error('not good', error)
      }
    }
    modelLoading()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isModelLoaded ? (
        <Text>Model loaded successfully!</Text>
      ) : (
        <Text>Loading model...</Text>
      )}
    </View>
  )
}

export default ModelLoadingComponent
