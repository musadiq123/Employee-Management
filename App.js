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
import {Provider, useDispatch} from 'react-redux';
import {store} from './store';
import SplashScreen from './src/splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            screenOptions={{
              headerShown: false,
              navigationOptions: {
                headerShown: false,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      <SplashScreen />
    </Provider>
  );
};
export default App;
