import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; // Import Icon from Expo
import COLORS from "../Home/Constants";

const UserProfile = () => {
  const [avatar, setAvatar] = useState('default_avatar.jpg');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const changeAvatar = () => {
    // Implement logic to change avatar
    Alert.alert('Thông báo', 'Thay đổi avatar thành công');
  };

  const logout = () => {
    // Implement logic to log out user
    Alert.alert('Thông báo', 'Đã đăng xuất');
  };

  const deleteUser = () => {
    // Implement logic to delete user account
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa tài khoản?', [
      { text: 'Hủy' },
      { text: 'Xác nhận', onPress: () => Alert.alert('Thông báo', 'Tài khoản của bạn đã bị xóa') },
    ]);
  };

  const changePassword = () => {
    // Implement logic to change password
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp');
    } else {
      // Implement logic to change password
      Alert.alert('Thông báo', 'Mật khẩu đã được thay đổi');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

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
                    height: 60,
                    backgroundColor: COLORS.white,
                    justifyContent: "center",
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: "700"}}>User Setting</Text>
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
                            <Ionicons name="image-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Thay avatar</Text>
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
                            <Ionicons name="lock-closed-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Thay đổi mật khẩu</Text>
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

                <Pressable style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1 }}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        width: "100%",
                        height: 70,
                        backgroundColor: 'red'
                        }}>
                        <TouchableOpacity 
                        style={{
                            marginHorizontal: 10,
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            borderRadius: 20
                            }}>
                            <Ionicons name="trash-outline" size={24} color={COLORS.black} />
                        </TouchableOpacity>

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>Xóa tài khoản</Text>
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

            </View>
        </SafeAreaView>
    </>
  );
};


export default UserProfile;
