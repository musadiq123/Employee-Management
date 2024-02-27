import {View, Text, FlatList, TextInput, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEmployee from './AddEmployee';
const ITEM_HEIGHT = 120;

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const employees = await AsyncStorage.getItem('employees');
      if (employees) {
        setEmployees(JSON.parse(employees));
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };

  

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 0.2,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{flex: 1, fontSize: 18}}>{item.name}</Text>
        <Text style={{flex: 1}}>{item.age}</Text>
        <Text style={{flex: 1}}>{item.address}</Text>
        <Text style={{flex: 1}}>{item.city}</Text>
      </View>
    </View>
  );

  if (isModalVisible) {
    return (
      <AddEmployee setEmployees={setEmployees} employees={employees} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}/>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize:20, justifyContent:'center', flex:1, alignSelf:'center'}}>Employee List</Text>
      <Button title="Add Employee" onPress={() => setIsModalVisible(true)} />
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemLayout={(data, index) => {
          return {index, length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index};
        }}
      />
      {/* {isModalVisible && (
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
      )} */}
    </View>
  );
}
