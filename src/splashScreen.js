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
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState, createContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmployeeList from './EmployeeList';
const SplashScreen = () => {
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => {
      setSplashScreenVisible(false);
    }, 2000);
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    // setSplashScreenVisible(false);
  };
  const handleUsernameChange = text => {
    setUsername(text);
    if (text.length < 4) {
      setUsernameError('Username must be at least 4 characters long');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const fetchAPI = () => {
    const login = 'https://your-api-url.com/login';
    fetch(login, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    // fetchAPI()
    try {
      const userData = {
        email: username,
        password: password,
      };
      await axios.post(`https://your-api-url.com/login`, userData).then(res => {
        console.log(res.status, res);
        if (res.status === 200) {
          console.log('res', res);
          setIsLoggedIn(true);
        } else {
          Alert.alert('Error', 'Invalid username or password.');
        }
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  if (splashScreenVisible) {
    return (
      <View style={styles.splashScreen}>
        <Image source={require('../flight1.jpg')} style={styles.logo} />
      </View>
    );
  }

  if (isLoggedIn) {
    return <EmployeeList />;
  }

  return (
    <View style={styles.loginScreen}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        Employee Login
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  logo: {
    width: 400,
    height: 600,
  },
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
export default SplashScreen;
