import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; // Import Icon from Expo
import COLORS from "./Constants";

const Storage = () => {
  const [savedHouses, setSavedHouses] = useState([
    {
        id: 1,
        name: "House 1",
        image: require("../../assets/images/khoc1.png"),
        description: "The best house in Tp. HCM",
        address: "Tp. HCM",
        room_count: 2,
        rent_price: 200000,
    },
    {
        id: 2,
        name: "House 2",
        image: require("../../assets/images/khoc1.png"),
        description: "The best house in Tp. HCM",
        address: "Tp. HCM",
        room_count: 2,
        rent_price: 200000,
    },
    {
        id: 3,
        name: "House 3",
        image: require("../../assets/images/khoc1.png"),
        description: "The best house in Tp. HCM",
        address: "Tp. HCM",
        room_count: 2,
        rent_price: 200000,
    },
  ]);

  const removeSavedHouse = (id) => {
    const updatedSavedHouses = savedHouses.filter((house) => house.id !== id);
    setSavedHouses(updatedSavedHouses);
  };

  const renderItem = ({ item }) => (
    <View style={styles.houseContainer}>
      <Image source={item.image} style={styles.houseImage} />
      <View style={styles.houseInfo}>
        <Text style={styles.houseName}>{item.name}</Text>
        <Text style={styles.houseDescription}>{item.description}</Text>
        <Text style={styles.houseAddress}>{item.address}</Text>
        <View style={styles.view}>
            <Text style={styles.houseDetails}>Rooms: {item.room_count}</Text>
            <Text>                  </Text>
            <Text style={styles.houseDetails}>Price: ${item.rent_price}</Text>
        </View>

      </View>
      <TouchableOpacity style={styles.opa} onPress={() => removeSavedHouse(item.id)}>
        <Ionicons name="trash-bin-outline" size={24} color={COLORS.red} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Nhà đã lưu</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={savedHouses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
  },
  opa: {
    top: -38,
  },
  container: {
    flex: 1,
    paddingHorizontal: 6,
    backgroundColor: COLORS.grey,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  houseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  houseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  houseInfo: {
    flex: 1,
    marginLeft: 10,
  },
  houseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  houseDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  houseAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  houseDetails: {
    fontSize: 16,
  },
});

export default Storage;
