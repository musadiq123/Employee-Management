import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddEmployee from '../AddEmployee';

describe('AddEmployee', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByTitle } = render(<AddEmployee />);
    const nameInput = getByPlaceholderText('Name');
    const ageInput = getByPlaceholderText('Age');
    const addressInput = getByPlaceholderText('Address');
    const cityInput = getByPlaceholderText('City');
    const addButton = getByTitle('Add');
    const cancelButton = getByTitle('Cancel');

    expect(nameInput).toBeTruthy();
    expect(ageInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  test('adds a new employee', () => {
    const setEmployees = jest.fn();
    const setIsModalVisible = jest.fn();
    const { getByPlaceholderText, getByTitle } = render(
      <AddEmployee
        setEmployees={setEmployees}
        employees={[]}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={false}
      />
    );

    const nameInput = getByPlaceholderText('Name');
    const ageInput = getByPlaceholderText('Age');
    const addressInput = getByPlaceholderText('Address');
    const cityInput = getByPlaceholderText('City');
    const addButton = getByTitle('Add');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(ageInput, '30');
    fireEvent.changeText(addressInput, '123 Main St');
    fireEvent.changeText(cityInput, 'New York');
    fireEvent.press(addButton);

    expect(setEmployees).toHaveBeenCalledWith([
      {
        id: expect.any(String),
        name: 'John Doe',
        age: '30',
        address: '123 Main St',
        city: 'New York',
      },
    ]);
    expect(setIsModalVisible).toHaveBeenCalledWith(false);
  });

  test('displays error when fields are empty', () => {
    const setEmployees = jest.fn();
    const setIsModalVisible = jest.fn();
    const { getByTitle } = render(
      <AddEmployee
        setEmployees={setEmployees}
        employees={[]}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={false}
      />
    );

    const addButton = getByTitle('Add');
    fireEvent.press(addButton);

    expect(setEmployees).not.toHaveBeenCalled();
    expect(setIsModalVisible).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'All fields are required');
  });
});