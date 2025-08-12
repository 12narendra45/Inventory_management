import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchMonthlySales } from '../api'; // your API call function

const screenWidth = Dimensions.get('window').width;

export default function MonthlySalesScreen() {
  const currentYear = new Date().getFullYear();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [labels, setLabels] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const loadMonthlySales = async () => {
    setLoading(true);
    try {
      const data = await fetchMonthlySales(month, year);
      setTotalSales(data.totalSales);
      setInvoiceCount(data.count);
      setLabels(data.labels);
      setSalesData(data.salesData);
      setInvoices(data.invoices || []);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const years = [];
  for (let y = currentYear; y >= currentYear - 5; y--) {
    years.push(y);
  }

  return (
    <View style={styles.container}>

      <View style={styles.pickerRow}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Month:</Text>
          <Picker
            selectedValue={month}
            onValueChange={(val) => setMonth(val)}
            style={styles.picker}
          >
            {[...Array(12).keys()].map((m) => (
              <Picker.Item key={m + 1} label={(m + 1).toString()} value={m + 1} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Year:</Text>
          <Picker
            selectedValue={year}
            onValueChange={(val) => setYear(val)}
            style={styles.picker}
          >
            {years.map((y) => (
              <Picker.Item key={y} label={y.toString()} value={y} />
            ))}
          </Picker>
        </View>
      </View>

      <Button title="Get Sales" onPress={loadMonthlySales} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {!loading && salesData.length > 0 && (
        <>
          <Text style={styles.summary}>
            Total Sales: ₹{totalSales.toFixed(2)} | Invoices: {invoiceCount}
          </Text>

          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: salesData }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisLabel="₹"
            chartConfig={{
              backgroundColor: '#f9f9f9',
              backgroundGradientFrom: '#f9f9f9',
              backgroundGradientTo: '#f9f9f9',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 20, borderRadius: 16 }}
          />

          <Text style={[styles.summary, { marginTop: 10 }]}>Invoices</Text>

          <FlatList
            data={invoices}
            keyExtractor={(item, index) => item._id || index.toString()}
            style={styles.invoices}
            renderItem={({ item }) => (
              <View style={styles.invoiceItem}>
                <Text style={styles.invoiceText}>
                  {item.date ? new Date(item.date).toLocaleDateString() : ''} -{' '}
                  {item.customerName}
                </Text>
                <Text style={styles.invoiceText}>
                  {item.medicineName} | Qty: {item.quantity} | ₹
                  {item.total.toFixed(2)}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E8F5E9', },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  pickerContainer: { flex: 1, marginHorizontal: 5 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  picker: { height: 50 },
  summary: { fontSize: 15, fontWeight: 'bold', marginTop: 15, textAlign: 'center' },
  invoices: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#A5D6A7',
  },
});
