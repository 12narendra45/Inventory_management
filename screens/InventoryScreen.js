import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button,TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchInventory } from '../api'; 

export default function InventoryScreen({ route, navigation }) {
  const { userRole, userName } = route.params;

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const data = await fetchInventory();
      setInventory(data);
      setFilteredInventory(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  //for immediate updation of list
  useFocusEffect(
    useCallback(() => {
      loadInventory();
    }, [])
  );

   const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ₹{item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const canManageInventory = userRole === 'admin' || userRole === 'pharmacy';

  return (
    <View style={styles.container}>
      <Icon name="user" size={20} color="black"/>
      <Text style={styles.welcome}>Welcome, {userName} ({userRole})</Text>
       <TextInput
        style={styles.searchInput}
        placeholder="Search by medicine name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => (item._id || item.id || '').toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No inventory available</Text>}
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="View Most Used Items"
          onPress={() => navigation.navigate('MostUsed')}
        />
        {canManageInventory && (
          <Button
            title="Add Inventory"
            onPress={() => navigation.navigate('AddInventory')}
          />
        )}
        {canManageInventory && (
          <Button
            title="Generate Invoice"
            onPress={() => navigation.navigate('Invoice', { userRole })}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  welcome: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#191ce7ff',
    marginLeft: 8, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    backgroundColor:'#ffc107'
  },
  searchInput: {
  height: 40,
  borderColor: '#A5D6A7', // light green border
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
  backgroundColor: '#FFFFFF', 
  marginBottom: 15,
  fontSize: 14,
  color: '#070707ff', 
},
});
