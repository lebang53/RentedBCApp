import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const SuccessScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigation.navigate("Home")
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
      <Text style={styles.message}>Success!</Text>
      <Text style={styles.info}>Please check your email for further details.</Text>
      <Text style={styles.countdown}>Returning to home screen in {countdown} seconds...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  countdown: {
    fontSize: 14,
    marginTop: 10,
    color: '#666',
  },
});

export default SuccessScreen;
