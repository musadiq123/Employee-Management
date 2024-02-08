import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState, createContext} from 'react';
import { Provider, useDispatch } from "react-redux";
import FlightBooking from './src/flightBooking';
import { store } from './store';
const App = () => {
  return (
    <Provider store={store}>
    <FlightBooking/>
    </Provider>
  );
};
export default App;
