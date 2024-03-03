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
import axios from "axios"
import UIButton from '../components/ui/UIButton'

export default function Prediction({ route, navigation }) {
  const { responseImage, responseType, responseColor } = route.params

  const [selectedType, setSelectedType ] = useState();
  const [selectedColor, setSelectedColor ] = useState();
  const [selectedSeason, setSelectedSeason ] = useState();
  const [selectedReason, setSelectedReason ] = useState();

  useEffect(() => {
    setSelectedType(responseType)
    setSelectedColor(responseColor)
  }, [])

  const categoryType = ['Shirts', 'Bluse', 'Pullover', 'Jeans', 'Boots','Cardigan', 'Sneaker', 'High Heels', 'Hoodie', 'Rock', 'Hose', 'Kurze Hose', 'Langarm Shirt', 'Sweater', 'Top'];
  const categoryColor = ['Blau', 'Braun', 'Gelb', 'Grau', 'Gruen', 'Lila', 'Magenta', 'Orange', 'Pink', 'Rot'];
  const categorySeason = ['Fruehling', 'Sommer', 'Herbst', 'Winter'];
  const categoryReason = ['Alle Styles', 'Classic', 'Casual', 'Streetwear', ' Party', 'Extravagant', 'Sport'];

  function handleButtonClickType(type) {
    setSelectedType(type)
  }

  function handleButtonClickColor(color) {
    setSelectedColor(color)
  }

  function handleButtonClickSeason(season) {
    setSelectedSeason(season)
  }

  function handleButtonClickReason(reason) {
    setSelectedReason(reason)
  }

  function onClickSave() {
    axios.post('http://127.0.0.1:5000/put', {
      type: selectedType,
      color: selectedColor,
      season: selectedSeason,
      reason: selectedReason,
      image: responseImage,
    })
    navigation.navigate('Test')
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
          {categoryColor.map((color) => (
            <UIButton title={color} onPress={() => handleButtonClickColor(color)}/>
          ))} 
        </View>
        <Text>Jahreszeit</Text>
        <View style={styles.buttonContainer}>
          {categorySeason.map((season) => (
            <UIButton title={season} onPress={() => handleButtonClickSeason(season)}/>
          ))}
        </View>
        <Text>Kleidungsstil</Text>
        <View style={styles.buttonContainer}>
          {categoryReason.map((reason) => (
            <UIButton title={reason} onPress={() => handleButtonClickReason(reason)}/>
          ))}
        </View>
        <UIButton title={'Speichern'} onPress={() => onClickSave()} />
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
