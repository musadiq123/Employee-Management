import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddEmployee({
  setEmployees,
  employees,
  setIsModalVisible,
  isModalVisible,
}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');


  const handleAddEmployee = () => {
    if (!name) {
      setNameError('Name is required');
    } else if (name.length < 3) {
      setNameError('Name must be at least 3 characters long');
    } else {
      setNameError('');
    }

    if (!age) {
      setAgeError('Age is required');
    } else if (isNaN(age)) {
      setAgeError('Age must be a number');
    } else {
      setAgeError('');
    }

    if (!address) {
      setAddressError('Address line is required');
    } else if (address.length < 2) {
      setAddressError('Address line must be at least 2 characters long');
    } else {
      setAddressError('');
    }

    if (!city) {
      setCityError('City is required');
    } else if (city.length < 3) {
      setCityError('City must be at least 3 characters long');
    } else {
      setCityError('');
    }

    if (!nameError && !ageError && !addressError && !cityError) {
      addEmployee()
    }
  };


  const addEmployee = async () => {
    if (!name || !age || !address || !city) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newEmployee = {
      id: Math.random().toString(),
      name,
      age,
      address,
      city,
    };

    setEmployees([...employees, newEmployee]);
    setName('');
    setAge('');
    setAddress('');
    setCity('');
    setIsModalVisible(false);

    try {
      await AsyncStorage.setItem(
        'employees',
        JSON.stringify([...employees, newEmployee]),
      );
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        borderWidth: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          justifyContent: 'center',
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        Add Employee
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[styles.border, styles.width]}
      />
      {nameError && <Text style={styles.error}>{nameError}</Text>}

      <TextInput
        placeholder="Age"
        value={age}
        keyboardType='numeric'
        onChangeText={setAge}
        style={[styles.border, styles.width]}
      />
      {ageError && <Text stle={styles.error}>{ageError}</Text>}

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={[styles.border, styles.width]}
      />
      {addressError && <Text style={styles.error}>{addressError}</Text>}

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={[styles.border, styles.width]}
      />
      {cityError && <Text style={styles.error}>{cityError}</Text>}

      <Button
        title="Add"
        onPress={handleAddEmployee}
        style={[styles.border, styles.width]}
      />
      <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 0.2,
  },
  width: {
    width: 300,
    height: 50,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },

});
