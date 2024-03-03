import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
  ScrollView
} from 'react-native'
import { useState, useEffect } from 'react'
import UIButton from '../components/ui/UIButton'

export default function Prediction({ route, navigation }) {
  const { responseImage, responseType, responseColor } = route.params

  const [selectedType, setSelectedType ] = useState();
  const [selectedColor, setSelectedColor ] = useState();
  const [setSelectedSeason, selectedSeason ] = useState();
  const [setSelectedReason, selectedReason ] = useState();

  useEffect(() => {
    setSelectedType(responseType)
    setSelectedColor(responseColor)
    console.log('selectedColor', selectedColor)
    console.log('selectedType', selectedType)
  }, [])

  const categoryType = ['Shirts', 'Bluse', 'Pullover', 'Jeans', 'Boots','Cardigan', 'Sneaker', 'High Heels', 'Hoodie', 'Rock', 'Hose', 'Kurze Hose', 'Langarm Shirt', 'Sweater', 'Top'];
  const categoryColor = ['Blau', 'Braun', 'Gelb', 'Grau', 'Gruen', 'Lila', 'Magenta', 'Orange', 'Pink', 'Rot'];
  const categorySeason = ['Fruehling', 'Sommer', 'Herbst', 'Winter'];
  const categoryReason = ['Alle Styles', 'Classic', 'Casual', 'Streetwear', ' Party', 'Extravagant', 'Sport'];

  function handleButtonClickType(type) {
    setSelectedType(type)
    console.log('handle', selectedType)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={{
            width: 300,
            height: 500,
            borderWidth: 1,
            borderColor: 'red',
          }}
          source={{ uri: `data:image/png;base64,${responseImage}` }}
        />
        <Text>Art der Kleidung</Text>
        <View style={styles.buttonContainer}>
          {categoryType.map((type) => (
            <UIButton title={type} onPress={() => handleButtonClickType(type)}/>
          ))} 
        </View>
        <Text>Farbe des Kleidungsstück</Text>
        <View style={styles.buttonContainer}>
          {/* {categoryColor.map((color) => (
            <UIButton title={color} />
          ))} */}
          {categoryColor.map((color, index) => (
            <Button key={index} title={color} color={responseColor === color ? 'red' : 'Black'} />
          ))}
        </View>
        <Text>Jahreszeit</Text>
        <View style={styles.buttonContainer}>
          {categorySeason.map((season) => (
            <UIButton title={season} />
          ))}
        </View>
        <Text>Kleidungsstil</Text>
        <View style={styles.buttonContainer}>
          {categoryReason.map((reason) => (
            <UIButton title={reason} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: 16,
    flexWrap: 'wrap',
  }
})
