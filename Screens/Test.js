import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';

export default function Test({route}) {
  const [ data, setData] = useState(null); // Setze data auf null als Standardwert

  useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/")
    .then(function (response) {
      console.log('console', response.data);
      setData(response.data)
    });
  }, []);

  // Überprüfe, ob data definiert ist, bevor du darauf zugreifst
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Lade...</Text>
      </View>
    );
  }

  // Wenn data definiert ist, kannst du darauf zugreifen
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Kleiderschrank</Text>
      <Text>{data.data[0].color}</Text>
      <Text>{data.data[0].type}</Text>
      <Text>{data.data[0].season}</Text>
      <Text>{data.data[0].reason}</Text>
      <Text>hi</Text>
      <Image
          style={{
            width: 300,
            height: 500,
            borderWidth: 1,
            borderColor: 'red',
          }}
          source={{ uri: `data:image/png;base64,${data.data[0].image}` }}
        />
    </View>
  );
}
