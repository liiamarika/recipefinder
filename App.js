import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image, KeyboardAvoidingView } from 'react-native';

export default function App() {

const [ingrd, setIngrd] = useState('');
const [recipes, setRecipes] = useState([]);

const getRecipes = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=` + ingrd;
  fetch(url)
  .then ( response => response.json() )
  .then ( responseJson => setRecipes(responseJson.meals) )
  .catch((error) => {
    Alert.alert('Error', error);
  });
}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};

  return (
    
   <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.listContainer}>
        <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal }
        renderItem= {
          ({item}) => 
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 7, width: 300}}>
            <Text>{item.strMeal}</Text>
            <Image style={{  width:20, height:20 }} 
            source={{  uri: '' + item.strMealThumb + '/preview' }} />
          </View>  }
        ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={{width:200, borderColor:'gray', borderWidth:1}} 
        value={ingrd}
        onChangeText={(ingrd) => setIngrd(ingrd)} />
        <Button title="find" 
        onPress = {getRecipes}/>
      </View>
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flex: 2,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  listContainer: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
});
