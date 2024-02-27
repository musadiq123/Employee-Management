import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmployeeList from '../EmployeeList';

describe('EmployeeList', () => {
  test('renders correctly', () => {
    const { getByTitle } = render(<EmployeeList />);
    const addButton = getByTitle('Add Employee');

    expect(addButton).toBeTruthy();
  });

  test('opens AddEmployee modal when Add Employee button is pressed', () => {
    const { getByTitle } = render(<EmployeeList />);
    const addButton = getByTitle('Add Employee');

    fireEvent.press(addButton);

    const modal = getByTitle('Add Employee Modal');

    expect(modal).toBeTruthy();
  });

  test('displays employee list correctly', () => {
    const employees = [
      {
        id: '1',
        name: 'John Doe',
        age: '30',
        address: '123 Main St',
        city: 'New York',
      },
      {
        id: '2',
        name: 'Jane Smith',
        age: '25',
        address: '456 Elm St',
        city: 'Los Angeles',
      },
    ];

    const { getByText } = render(<EmployeeList employees={employees} />);
    const johnDoeName = getByText('John Doe');
    const janeSmithName = getByText('Jane Smith');

    expect(johnDoeName).toBeTruthy();
    expect(janeSmithName).toBeTruthy();
  });

  test('calls setEmployees and setIsModalVisible when employee is added', () => {
    const setEmployees = jest.fn();
    const setIsModalVisible = jest.fn();

    const { getByPlaceholderText, getByTitle } = render(
      <EmployeeList setEmployees={setEmployees} setIsModalVisible={setIsModalVisible} />
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
});