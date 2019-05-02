EULIMS Mobile
===

> A mobile app to be used by the Lab Analysts to quickly tag samples and *view inventory** using their smartphone.

---

### Modules

Main modules are located under `./src/screens`

* [Authentication](#authentication)
* [Sample Tagging](#sample-tagging)
* [Inventory](#inventory)

---

### Technologies Used

* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org/)
* [Expo](https://expo.io/)
* [NativeBase](https://docs.nativebase.io/)
* [Undux](https://undux.org/)

---

## Modules

Modules are loaded based in order of how it is defined inside [`router.js`](src/router.js)

### Authentication

1. `boot.js` will first check for previous configurations.
    1. If no `servers` defined, load from `configs.json`
    1. If no `prefServer` or `token` defined, navigate to `Login.js`
    1. Else, check if `prefServer` is online
    1. If online, check `token` if valid.
    1. If valid, navigate to `sampleTagging`'s route index: `RecentScans.js`
    1. Else, navigate to `Login.js` with necessary notifications.
1. `Login.js` will be displayed if either `prefServer` or `token` is not defined; Or preferred server is offline.
    1. Check if `email`, `password`, & `prefServer` is defined.
    1. If defined, send inputs to `/login` API.
    1. If valid, store returned `token` and `user` data to the phone and navigate to `sampleTagging`'s route index.
    1. Else, notify user.

### Sample Tagging

1. `RecentScans.js` displays previously scanned tags for quick referrence.
1. `CodeScanner.js` is a camera module to scan bar/qr code sample tags.
    1. Check for camera access permission, ask if not granted.
    1. If granted, mount camera module.
    1. On bar/qr code is detected, vibrate phone and send *Tag ID* to `/analysis` API.
    1. Navigate to `Analyis.js` and pass the API response.
1. `Analysis.js` displays the analysis data if it exist.
1. `Search.js` displays list of *Tag ID*'s that starts with the search term.
    1. On type, send search keyword to `/samplecode` API.
1. `Tagging.js` displays the procedures/workflow of the selected analysis.
    1. On tap of either `pending`, `ongoing`, or `completed`, send selected option, *Analysis and Workflow ID* to `/workflow-status` API.

### Inventory

*To be updated.*

---

## Miscs

* [API Documentation](src/api/README.md)
* [API Toolkit](src/api/index.js)
* [API Simulator](src/api/simulator.js)

---

DOST IX &bull; OneLab &bull; EULIMS &copy; 2019
