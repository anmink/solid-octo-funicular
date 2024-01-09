import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import axios from 'axios'

export default function Prediction({ route, navigation }) {
  const { image } = route.params

  const apiCall = async () => {
    try {
      await axios.post('http://localhost:8000/remove', {
        image: image,
      })

      //console.log('API-Antwort:', response.data)
    } catch (error) {
      console.error('Fehler beim API-Aufruf:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="API Call" onPress={() => apiCall(image)} />
      <Image
        style={{
          width: 300,
          height: 500,
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{ uri: `data:image/png;base64,${image}` }}
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
