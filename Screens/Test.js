import React, { useState, useEffect } from 'react'
import { View, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access media library is required!')
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }

  const removeBackground = async () => {
    try {
      const response = await fetch(imageUri)
      const imageBlob = await response.blob()
      const imageData = await imageBlob.arrayBuffer()

      const removedBackgroundData = rembg.remove(Buffer.from(imageData))
      const removedBackgroundUri = `data:image/png;base64,${removedBackgroundData.toString(
        'base64'
      )}`

      // Verwende removedBackgroundUri für die Darstellung oder Speicherung des bearbeiteten Bildes
      console.log('Hintergrund entfernt:', removedBackgroundUri)
    } catch (error) {
      console.error('Fehler beim Entfernen des Hintergrunds:', error)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}
      <Button title="Bild auswählen" onPress={pickImage} />
      {imageUri && (
        <Button title="Hintergrund entfernen" onPress={removeBackground} />
      )}
    </View>
  )
}
