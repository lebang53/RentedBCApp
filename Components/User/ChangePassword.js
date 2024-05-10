import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE, CATEGORY, CHANGE_PASSWORD, CREATE_HOUSE} from '../../constants/api';
import { UserContext } from '../../context/userContext';
import COLORS from '../Home/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserStyles from '../User/UserStyles';
import { ActivityIndicator } from 'react-native';

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {userInfo, isAuthenticated } = useContext(UserContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (!oldPassword.trim()) {
            alert('Hãy nhập mật khẩu hiện tại trước.');
            return;
        }

        if (!newPassword.trim()) {
            alert('Hãy nhập mật khẩu muốn đổi.');
            return;
        }
        if (oldPassword === newPassword) {
            Alert.alert('Error!', 'Mật khẩu mới không được giống với mật khẩu cũ');
            return;
        }
        setIsLoading(true)
        try {
            if (isAuthenticated()) {

                const response = await axios.post(`${API_BASE}${CHANGE_PASSWORD}`, {
                    old_password: oldPassword,
                    new_password: newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    }
                );
                
                if (response.status === 200) {
                    Alert.alert('Success!','Sửa mật khẩu thành công');
                } else {
                    console.error('Đã xảy ra lỗi thay đổi mật khẩu', response.data);
                }
                
            } else {
                console.log('Người dùng chưa được xác thực');
            }

        } catch (error) {
            if (error.response.status === 400) {
                Alert.alert('Error!', 'Mật khẩu cũ không chính xác');
            } else {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu đến server:', error);
            }
        }
        finally{
            setIsLoading(false)
        }
    };
  

    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={{flex: 1}}>
                <Text 
                    style={{
                        margin: 22,
                        fontSize: 22,
                        fontWeight: "bold",
                    }}>
                        Thay đổi mật khẩu
                </Text>
                
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Old password:
                    </Text>
                    <TextInput
                    style={{ 
                        borderWidth: 1, 
                        borderColor: 'gray', 
                        padding: 10,
                        borderRadius: 30,
                        paddingHorizontal: 16,
                        width: "90%",
                        alignSelf: 'center',
                    }}

                        placeholder="Nhập mật khẩu hiện tại..."
                        onChangeText={text => setOldPassword(text)}
                        value={oldPassword}
                    />
                </View>
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        New password:
                    </Text>
                    <TextInput
                    style={{ 
                        borderWidth: 1, 
                        borderColor: 'gray', 
                        padding: 10,
                        borderRadius: 30,
                        paddingHorizontal: 16,
                        width: "90%",
                        alignSelf: 'center',
                    }}

                        placeholder="Nhập mật khẩu mới..."
                        onChangeText={text => setNewPassword(text)}
                        value={newPassword}
                    />
                </View>
                
                
                <TouchableOpacity onPress={handleChangePassword}
                style={{
                    top: 30,
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    paddingVertical: 14,
                    width: "90%",
                    alignSelf: "center",
                }}>
                    <Text 
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: COLORS.white,
                        alignSelf: "center",
                    }}>
                        Đổi mật khẩu
                    </Text>
                </TouchableOpacity>

                <View style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 7,
                }}>
                    
                    
                </View>
            </View>
            {isLoading && (
                <View style={UserStyles.loadingIndicator}>
                    <ActivityIndicator
                     size={60} color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default ChangePassword;
