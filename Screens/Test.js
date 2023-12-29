import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'
import axios from 'axios'

export default function Home({ navigation }) {
  const apiCall = () => {
    const bild = {
      path: '/Users/anne/Desktop/Ordner/Code/dressflow/images/IMG_5043.jpg',
    }
    axios.post('http://localhost:8080/remove', bild).then((response) => {
      console.log(response.data)
    })
    console.log('api call')
  }

  return (
    <View style={styles.container}>
      <Button title="API Call" onPress={() => apiCall()} />
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
