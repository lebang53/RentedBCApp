import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

const MapViewComponent = () => {
  const polygonCoordinates = [
    { latitude: 10.95, longitude: 106.82 },
    { latitude: 10.96, longitude: 106.83 },
    { latitude: 10.94, longitude: 106.83 },
  ];

  const [area, setArea] = useState(null);

  const calculateArea = () => {
    // Calculate area here using mathematical formulas
    // You can implement your preferred method for calculating the area
    // For example, using the Shoelace formula or other geometric methods
    // Once calculated, update the state with the area value
    // setArea(calculatedArea);
    // For now, let's just set a placeholder value
    setArea(0.001); // Placeholder value
  };

  const openGoogleMapsApp = () => {
    // Replace latitude and longitude with your desired location
    const latitude = 10.9501;
    const longitude = 106.8165;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.9501,
          longitude: 106.8165,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 10.9501, longitude: 106.8165 }}
          title="Marker Title"
          description="Marker Description"
          image={"https://res.cloudinary.com/dzgugrqxz/image/upload/v1715186058/p38zbeibfrk1daofpknq.png"}
        />
        <Polygon
          coordinates={polygonCoordinates}
          fillColor="rgba(0, 255, 0, 0.5)"
          strokeColor="rgba(0, 0, 255, 0.7)"
          strokeWidth={2}
        />
      </MapView>
      <View style={styles.areaContainer}>
        <Text style={styles.areaText}>Area: {area ? `${area} square units` : 'Calculating...'}</Text>
        <Button title="Calculate Area" onPress={calculateArea} />
      </View>
      <TouchableOpacity style={styles.googleMapsButton} onPress={openGoogleMapsApp}>
        <Text style={styles.buttonText}>Open in Google Maps App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  areaContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  areaText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleMapsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapViewComponent;
