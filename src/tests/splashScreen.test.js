import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SplashScreen from '../splashScreen';

describe('SplashScreen', () => {
  test('renders splash screen correctly', () => {
    const { getByTestId } = render(<SplashScreen />);
    const splashScreen = getByTestId('splash-screen');

    expect(splashScreen).toBeTruthy();
  });

  test('displays error message when username is less than 4 characters', () => {
    const { getByPlaceholderText, getByText } = render(<SplashScreen />);
    const usernameInput = getByPlaceholderText('Username');

    fireEvent.changeText(usernameInput, 'abc');
    const errorMessage = getByText('Username must be at least 4 characters long');

    expect(errorMessage).toBeTruthy();
  });

  test('displays error message when password is less than 8 characters', () => {
    const { getByPlaceholderText, getByText } = render(<SplashScreen />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, '1234567');
    const errorMessage = getByText('Password must be at least 8 characters long');

    expect(errorMessage).toBeTruthy();
  });

  test('calls fetchAPI function when login button is pressed', () => {
    const { getByPlaceholderText, getByTitle } = render(<SplashScreen />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByTitle('Login');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    // TODO: Add assertions for fetchAPI function
  });

  // TODO: Add more test cases for other functionality
});