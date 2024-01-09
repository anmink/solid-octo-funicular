import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Buffer } from 'buffer'
import axios from 'axios'

export default function Upload({ navigation }) {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState()
  const [imageByte, setImageByte] = useState()

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()
  }, [])

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    )
  }

  const checkFileAccess = async (result) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(result)
      if (fileInfo.exists) {
        console.log(
          `Die Datei existiert. Zugriffsrechte: ${fileInfo.canRead}, ${fileInfo.canWrite}, ${fileInfo.canDelete}`
        )
      } else {
        console.log('Die Datei existiert nicht.')
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen der Zugriffsrechte:', error)
    }
  }

  const convertPhoto = () => {
    const path = photo
    console.log(path)
    // Lese die Bilddaten aus der Datei
    const imageBase64 = FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.Base64,
    })
    //console.log(imageBase64)

    // Konvertiere den Base64-String in ein Byte-Array
    const imageBuffer = Buffer.from(imageBase64, 'base64')
    const imageBytes = new Uint8Array(imageBuffer)
    //setPhoto(imageBytes)
    setImageByte(imageBytes)
  }

  let takePic = async () => {
    try {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      }
      const result = await cameraRef.current.takePictureAsync(options)
      //console.log(result.base64)
      setPhoto(result.uri)
      setImageByte(result.base64)
    } catch (error) {
      console.error('fehler beim aufnehmen des bildes:', error)
    }
  }

  let pickPic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })
    //hier den API call to remove machen
    console.log(result.assets[0])
    setPhoto(result.assets[0].uri)
  }

  if (photo) {
    /* const path = photo
    const imageBase64 = FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const imageBuffer = Buffer.from(imageBase64, 'base64')
    const imageBytes = new Uint8Array(imageBuffer)
    setImageByte(imageBytes) */
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }

    let savePhoto = async () => {
      /* MediaLibrary.saveToLibraryAsync(photo).then(() => {
        setPhoto(undefined)
      }) */
      console.log(imageByte)

      const response = await axios.post(
        //'https://testtrainoregon.onrender.com/remove',
        'http://192.168.2.177:8082/remove',
        //'http://localhost:8081/remove',
        imageByte
      )
      const base64img = response.data
      /*console.log('base64', base64img)
        setRemovedPhoto(base64img)
        console.log('state:', removedPhoto) */

      navigation.navigate('Prediction', {
        image: base64img,
      })
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* <Image style={styles.preview} source={{ uri: photo }} /> */}
        <Image
          style={styles.preview}
          source={{ uri: `data:image/png;base64,${imageByte}` }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button
          title="Go to Prediction"
          onPress={() => navigation.navigate('Prediction')}
        />
      </SafeAreaView>
    )
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
        <Button title="Pick Pic" onPress={pickPic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
})
