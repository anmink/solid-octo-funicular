import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home sweet home</Text>

      <Button
        title="Go to Upload"
        onPress={() => navigation.navigate('Upload')}
      />
      <Button
        title="Go to Prediction"
        onPress={() => navigation.navigate('Prediction')}
      />
      <Button title="Test" onPress={() => navigation.navigate('Test')} />
      <Button
        title="Classification"
        onPress={() => navigation.navigate('Classification')}
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
