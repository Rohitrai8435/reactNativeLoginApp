import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {getLogin} from './ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data !== null) {
        navigation.navigate('Home');
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  // Function to fetch login details
  const fetchLogin = async () => {
    try {
      const response = await getLogin(id, password);
      if (response.status === 200) {
        await AsyncStorage.setItem('userData', JSON.stringify(response));
        navigation.navigate('Home');
      }
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder="Enter Username"
        placeholderTextColor="#888"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible} // Toggle password visibility
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={fetchLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  toggleButton: {
    padding: 10,
  },
  toggleText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
