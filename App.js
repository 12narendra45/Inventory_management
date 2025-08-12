
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './screens/LoginScreen';
import InventoryScreen from './screens/InventoryScreen';
import AddInventoryScreen from './screens/AddInventoryScreen';
import MostUsedScreen from './screens/MostUsedScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import RegisterScreen from './screens/RegisterScreen'
import MonthlySalesScreen from './screens/MonthlySalesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F0F4F8',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
  >
      
        <Stack.Screen name="Login" 
          component={LoginScreen} 
          options={{
            title: 'Hospital & Pharmacy Login'}}
        />
        
        <Stack.Screen
          name="Register"  
          component={RegisterScreen}
          options={{ title: 'Register New User'}}
        />

         <Stack.Screen name="Inventory" 
          component={InventoryScreen} 
          options={{ title: 'Inventory' ,
            headerStyle: {
              backgroundColor: '#F0F4F8', 
              },
              headerTintColor: 'green',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
             headerTitleAlign: 'center'
            }} 
        />

  
        <Stack.Screen name="AddInventory" 
          component={AddInventoryScreen} 
          options={{ title: 'Add Inventory' }} 
        />

 
        <Stack.Screen name="MostUsed" 
          component={MostUsedScreen} 
          options={{ title: 'Most Used Inventory' }} 
        />

    
        <Stack.Screen name="Invoice" 
          component={InvoiceScreen} 
          options={{ title: 'Generate Invoice' }} 
        />

        <Stack.Screen name="MonthlySales"
        component={MonthlySalesScreen}
        options={{ title: 'Monthly Sales Report' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
