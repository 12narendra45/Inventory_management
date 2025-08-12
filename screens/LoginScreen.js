import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { loginUser } from '../api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!username.trim() || !password.trim()) {
    Alert.alert('Error', 'Please enter your username and password');
    return;
  }

  setLoading(true);
  const user = await loginUser({ username, password, role });
  console.log('Logged in user:', user); 
  setLoading(false);
  if (user && user.success) {
    Alert.alert(user.message)
    navigation.navigate('Inventory', { userRole: user.role, userName: user.username });
  } else {
    Alert.alert('Login Failed','Invalid username,password or role ');
  }
};

  return (
    <View style={styles.container}>
     

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Select your role:</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
        enabled={!loading}
      >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Pharmacy Staff" value="pharmacy" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        disabled={loading}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
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
    color:'green'
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
    marginBottom: 20,
  },
  registerContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
