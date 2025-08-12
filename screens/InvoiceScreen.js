import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator ,TouchableOpacity} from 'react-native';
import { createInvoice } from '../api';

export default function InvoiceScreen({ route, navigation }) {
  const { userRole } = route.params;

  const [customerName, setCustomerName] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateInvoice = async () => {
    if (!customerName || !medicineName || !quantity || !pricePerUnit) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    const total = parseInt(quantity) * parseFloat(pricePerUnit);
    const newInvoice = {
      customerName,
      medicineName,
      quantity: parseInt(quantity),
      pricePerUnit: parseFloat(pricePerUnit),
      total,
      date: new Date().toISOString(),
    };

    try {
      const savedInvoice = await createInvoice(newInvoice);
      setInvoice(savedInvoice);
      Alert.alert('Success', 'Invoice created successfully!');
      setCustomerName('');
      setMedicineName('');
      setQuantity('');
      setPricePerUnit('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
        autoCapitalize="words"
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
        placeholder="Price per unit"
        keyboardType="numeric"
        value={pricePerUnit}
        onChangeText={setPricePerUnit}
      />

     <TouchableOpacity
  style={[styles.button, loading && styles.buttonDisabled]}
  onPress={handleGenerateInvoice}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? "Saving..." : "Generate Invoice"}
  </Text>
</TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#0000ff" />}

      {invoice && (
        <View style={styles.invoiceBox}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <Text>Date: {new Date(invoice.date).toLocaleDateString()}</Text>
          <Text>Customer: {invoice.customerName}</Text>
          <Text>Medicine: {invoice.medicineName}</Text>
          <Text>Quantity: {invoice.quantity}</Text>
          <Text>Price per unit: ₹{invoice.pricePerUnit}</Text>
          <Text style={styles.total}>Total: ₹{invoice.total}</Text>
        </View>
      )}

     {userRole === 'admin' && (
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('MonthlySales')}
        >
          <Text style={styles.buttonText}>View Monthly Sales</Text>
        </TouchableOpacity>
      )}
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
  invoiceBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#A5D6A7',
  },
  invoiceTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 5,
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
