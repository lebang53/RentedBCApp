import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; // Import Icon from Expo
import COLORS from "../Home/Constants";

const Management = ({ navigation }) => {

  return (
    <>
        <StatusBar translucent backgroundColor={COLORS.white} />
        <SafeAreaView style={{flex: 1}}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                <View 
                style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    width: "100%",
                    height: 90,
                    backgroundColor: COLORS.white
                    }}>
                    <Image source={require("../../assets/images/khoc1.png")} style={{ width: 50, height: 50, borderRadius: 25, marginHorizontal: 10 }} />

                    <View style={{ flex:1}}>
                        <Text style={{ fontSize: 16, fontWeight: "600"}}>LeBang</Text>
                        <Text style={{ fontSize: 15, fontWeight: "700"}}>0375574702</Text>
                    </View>

                    <TouchableOpacity 
                    style={{
                        marginRight: 10, 
                        paddingHorizontal: 16, 
                        paddingVertical: 16, 
                        backgroundColor: "red", 
                        borderRadius: 20
                        }}>
                        <Ionicons name="log-out-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{flex: 1}}>
                <Pressable style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: COLORS.white
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="gift-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>RENTEDBC Pro+</Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 10, 
                            paddingVertical: 10, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </Pressable>

                <View style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: COLORS.white
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="shield-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Cài đặt ứng dụng</Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 10, 
                            paddingVertical: 10, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: COLORS.white
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="information-circle-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Thông tin ứng dụng</Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 10, 
                            paddingVertical: 10, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: COLORS.white
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="cube-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Phiên bản</Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 10, 
                            paddingVertical: 10, 
                            borderRadius: 20
                            }}>
                            <Text style={{color: COLORS.grey}}>Beta</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Pressable onPress={() => navigation.navigate("UserProfile")}
                style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: COLORS.white
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="person-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 15, fontWeight: "700", flex: 1}}>Cài đặt tài khoản</Text>

                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 10, 
                            paddingVertical: 10, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </Pressable>

            </View>
        </SafeAreaView>
    </>
  );
};

export default Management;
