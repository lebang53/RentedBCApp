import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import COLORS from "./Constants";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Thông báo 1", content: "Nội dung thông báo 1" },
    { id: 2, title: "Thông báo 2", content: "Nội dung thông báo 2" },
    { id: 3, title: "Thông báo 3", content: "Nội dung thông báo 3" },
    { id: 4, title: "Thông báo 4", content: "Nội dung thông báo 4" },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationContent}>{item.content}</Text>
    </View>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Thông báo</Text>
        </View>
        <View style={styles.container}>
          <FlatList
              data={notifications}
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
  notificationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 16,
  },
});

export default Notifications;
