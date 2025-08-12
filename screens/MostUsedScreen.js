import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchMostUsedItems } from '../api'; 

export default function MostUsedScreen() {
  const [mostUsedItems, setMostUsedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMostUsed() {
      try {
        const data = await fetchMostUsedItems();
        setMostUsedItems(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load most used items');
      } finally {
        setLoading(false);
      }
    }
    loadMostUsed();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item._id || item.name} — Used {item.totalUsed || item.usageCount} times
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mostUsedItems}
        keyExtractor={(item) => (item._id || item.id || '').toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No data available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
      backgroundColor: '#E8F5E9',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 20,
  },
});
