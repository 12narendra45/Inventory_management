import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import { registration } from '../api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

const handleRegister = async () => {
  if (!username.trim() || !password.trim()) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }
  try {
    const data = await registration({ username, password, role });
    if (data.success) {
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', data.message || 'Registration failed');
    }
  } catch (error) {
    Alert.alert('Error', 'Network error, try again later');
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Select Role:</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Pharmacy Staff" value="pharmacy" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor:'green'
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
});
