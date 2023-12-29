import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'

export default function Prediction({ route, navigation }) {
  const { image } = route.params

  const removing = (img) => {
    removeBackground(img).then((blob) => {
      window.open(URL.createObjectURL(blob))
    })
  }

  return (
    <View style={styles.container}>
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
