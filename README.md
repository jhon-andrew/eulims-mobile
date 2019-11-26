EULIMS Mobile
===

The mobile app companion of the Enhanced Unified Laboratory Information Management System (EULIMS) web portal.

---

### Technologies Used

* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org/)
* [Expo](https://expo.io/)
  * [Expo Camera - QR/Bar code scanner.](https://docs.expo.io/versions/latest/sdk/camera/)
  * [Expo Image Picker - For product thumbnail selection.](https://docs.expo.io/versions/latest/sdk/imagepicker/)
* [Axios - HTTP client.](https://github.com/axios/axios)
* [NativeBase](https://docs.nativebase.io/)
* [Undux](https://undux.org/)

---

### Modules

1. [Authentication](src/screens/Auth)
   1. Server Selection
   2. Login
2. [Bar/QR Code Scanner](src/screens/CodeScanner.js)
   1. Scan a Sample Tag
   2. Scan a Product Tag (Consumable/Equipment)
3. [Sample Tagging](src/screens/SampleTagging)
   1. Search Sample Code
   2. View Analysis
   3. Tag a Sample
4. [Inventory](src/screens/Inventory)
   1. Products - list of products that can be sorted either consumable or equipment.
   2. Entries - a list of entries a consumable has that can be ordered.
   3. Cart - a list of entries that is ready to be withdrawn.
   4. Product - manage thumbnail of a product.
   5. Schedule - set an appointment schedule for an equipment.
5. [Customer](src/screens/Customer)
   1. Booking
   2. Tracking
   3. Wallet

---

DOST IX &bull; OneLab &bull; EULIMS &copy; 2019
