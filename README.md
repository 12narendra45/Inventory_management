# 💊 Pharmacy Inventory & Invoice Management App

A modern **React Native** application for pharmacies and clinics to **manage inventory**, **generate invoices**, and **track monthly sales** — built with **role-based access** so admins and pharmacy staff can easily collaborate.

---

## 🚀 Features

### **Inventory Management**
- View live inventory list with quantity and price.
- Role-based actions:  
  - **Admin / Pharmacy:** Add inventory, generate invoices.  
  - **Staff:** View inventory, check usage stats.
  - **Staff:** Can View monthly sales with visulization

### **Invoice Generation**
- Generate professional invoices instantly.
- Calculates total based on quantity × price per unit.
- Saves invoices via backend API.
- Displays the last generated invoice on-screen.

### **Monthly Sales Tracking**
- Admins can view **monthly sales analytics** for better decision-making.
- Planned: Graphical charts for visualizing revenue trends.

---

## 🛠 Tech Stack
- **Frontend:** React Native (Expo / CLI)
- **Navigation:** React Navigation
- **State & Hooks:** React Hooks (`useState`, `useCallback`, `useFocusEffect`)
- **API Integration:** Custom API layer (`fetchInventory`, `createInvoice`)
- **UI:** Native components + StyleSheet

---

## 📱 Screens Flow

### **1. Login & Role Detection**
➡️ **User logs in** → role (`admin`, `pharmacy`, `staff`) is determined.

### **2. Inventory Screen**
- Shows all available medicines.
- Buttons visible based on role:
  - **Most Used Items** (All)
  - **Add Inventory** (Admin / Pharmacy)
  - **Generate Invoice** (Admin / Pharmacy)

### **3. Invoice Screen**
- Fill in: Customer Name, Medicine, Quantity, Price/Unit.
- Auto-calculates total.
- Displays invoice immediately after creation.
- Admins get **View Monthly Sales** button.

---

## 🧠 Thought Process

This project was designed with **real pharmacy workflows** in mind:
1. **Simplicity First** — Minimal learning curve for non-technical staff.
2. **Role-Based UX** — Prevents unauthorized access to sensitive features.
3. **Scalable Architecture** — API-driven, so backend can grow independently.
4. **Offline-Ready Potential** — Can be extended to work offline for rural pharmacies.
5. **Clean Code for Maintainability** — Each screen has single responsibility and reusable API calls.

---

## 🖼 Screenshots

> Replace these placeholders with actual screenshots.

| Login Screen | Register Invoice | Inventory Display |
|------------------|------------------|-----------------|
| ![Inventory](ScreenShots/login.png) | ![InvoiceForm](ScreenShots/register.png) | ![InvoiceResult](ScreenShots/inventory.png) |

---

## 🔄 App Flow Diagram

```mermaid
flowchart TD
    A[Login] --> B[Inventory Screen]
    B -->|View Most Used| C[Most Used Items Screen]
    B -->|Add Inventory| D[Add Inventory Screen]
    B -->|Generate Invoice| E[Invoice Screen]
    E -->|Admin Only| F[Monthly Sales Screen]
```

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pharmacy-inventory.git

# Navigate into the folder
cd pharmacy-inventory

# Install dependencies
npm install
# or
yarn install

# Start the app
npm start
# or
yarn start
```

---

## 🧩 Folder Structure

```
/src
  /api         # API calls (fetchInventory, createInvoice)
  /screens
    InventoryScreen.js
    InvoiceScreen.js
    MostUsedScreen.js
    AddInventoryScreen.js
    MonthlySalesScreen.js
  App.js
```

---

## 🔮 Future Enhancements
- 📊 Interactive charts for sales & stock trends.
- 📄 PDF invoice export.
- ☁️ Cloud sync for multi-branch pharmacies.
- 🔔 Low-stock alerts via push notifications.

---

