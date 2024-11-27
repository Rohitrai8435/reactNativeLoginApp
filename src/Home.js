import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { getAlaramData } from './ApiService';

const Home = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState({});
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const imei = "864180054092049";
      const aid = "5778";
      const ctm_id = "59";
      const s_date = '2024-11-01';
      const e_date = '2024-11-26';
      const usertype = 'NationalLevel';
      const client_version = 'v4';

      const response = await getAlaramData(
        imei,
        aid,
        ctm_id,
        s_date,
        e_date,
        usertype,
        client_version,
      );
      if (response.status === 200) {
      
       setData(response.data);
       console.log(data);
        
      }
      console.log('dataShow successful:', response);
    } catch (error) {
      console.error('Error during Data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    getData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData'); // Fetch the data from AsyncStorage
      if (data !== null) {
        const parsedData = JSON.parse(data); // Parse the JSON string into an object

        // Destructure the required fields from the nested 'data' object
        const {fullname, emailid} = parsedData.data;

        console.log('Full Name:', fullname); // Access 'fullname' from 'parsedData.data'
        console.log('Email:', emailid);
        setEmail(emailid);
        setFullName(fullname); // Access 'emailid' from 'parsedData.data'
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Full Name: {fullName}</Text>
        <Text style={styles.infoText}>Email: {email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>{data} </Text>
        <Text style={styles.infoText}>Email: {email}</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  logoutButton: {
    width: '90%',
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
