const BASE_URL = 'http://10.35.171.212:3000/api'; //if we are running the application in localhost have to give the localhost path or system ip address of your system

export async function fetchInventory() {
  try {
    const response = await fetch(`${BASE_URL}/inventory`);
    if (!response.ok) throw new Error('Failed to fetch inventory');
    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}


export async function addInventoryItem(item) {
  try {
    const response = await fetch(`${BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) 
        throw new Error('Failed to add inventory item');
    return await response.json();
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return { success: false };
  }
}


export async function fetchMostUsedItems() {
  try {
    const response = await fetch(`${BASE_URL}/most-used`);
    if (!response.ok) throw new Error('Failed to fetch most used items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching most used items:', error);
    return [];
  }
}


export async function createInvoice(invoice) {
  try {
    const response = await fetch(`${BASE_URL}/invoice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) throw new Error('Failed to create invoice');
    return await response.json();
  } catch (error) {
    console.error('Error creating invoice:', error);
    return { success: false };
  }
}


export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) 
      throw new Error('Login failed');
    return await response.json();
  } catch (error) {
    return { success: false};
  }
}


export async function registration(data) {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Register failed');
    }
    return responseData;
  } catch (error) {
    return { success: false, message: error.message || 'Network error' };
  }
}


export async function fetchMonthlySales(month, year) {
  try {
    const response = await fetch(`${BASE_URL}/sales/monthly?month=${month}&year=${year}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}