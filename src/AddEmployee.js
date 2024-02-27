import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
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
    <View style={{flex: 1, borderWidth: 0.2}}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />
      <Button title="Add" onPress={addEmployee} />
      <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({});
