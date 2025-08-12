import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { addInventoryItem } from '../api'; 

export default function AddInventoryScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name.trim() || !quantity.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const newItem = {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };

      const response = await addInventoryItem(newItem);
      
      if (response.sucess) {
        Alert.alert('Success', `${name} added to inventory!`);
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to add item');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
      backgroundColor: '#E8F5E9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    borderColor: '#A5D6A7',
    marginBottom: 15,
    
  },
  button:{
    marginTop:10,
    backgroundColor:'#17a2b8',
    height:50,
     justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold',
  },
});
