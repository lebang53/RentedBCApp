import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import axios để gửi request đến API
import { Picker } from '@react-native-picker/picker';
import { API_BASE, CATEGORY, CREATE_HOUSE} from '../../constants/api';
import { UserContext } from '../../context/userContext';
import COLORS from '../Home/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserStyles from '../User/UserStyles';
import { ActivityIndicator } from 'react-native';

const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [roomCount, setRoomCount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo, isAuthenticated } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (isAuthenticated()) {
                    const response = await axios.get(`${API_BASE}${CATEGORY}`, {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    });
                    setCategories(response.data.results);
                } else {
                    console.log('Người dùng chưa được xác thực');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelectionChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handlePostHouseSubmit = async () => {
        if (!description.trim()) {
        alert('Vui lòng nhập description nhà trước khi đăng bài.');
        return;
        }
    
        if (!address.trim()) {
        alert('Vui lòng nhập địa chỉ nhà trước khi.');
        return;
        }

        if (!phoneNumber.trim()) {
        alert('Vui lòng nhập số điện thoại nhà trước khi đăng bài.');
        return;
        }
    
        if (!rentPrice.trim()) {
        alert('Vui lòng nhập giá thuê nhà trước khi đăng bài.');
        return;
        }

        if (!roomCount.trim()) {
        alert('Vui lòng nhập số phòng nhà trước khi đăng bài.');
        return;
        }
        setIsLoading(true)
        try {
            if (isAuthenticated()) {

                const response = await axios.post(`${API_BASE}${CREATE_HOUSE}`, {
                    description: description,
                    address: address,
                    phone_number: phoneNumber,
                    rent_price: rentPrice,
                    room_count: roomCount,
                    category: selectedCategory,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    }
                );
                if (response.status === 201) {
                    console.log('Bài post đã được đăng:', response.data);
                } else {
                    console.error('Đã xảy ra lỗi khi đăng bài post:', response.data);
                }
            } else {
                console.log('Người dùng chưa được xác thực');
            }
        
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gửi yêu cầu đến server:', error);
            // console.error('Error message:', error.message);
            // console.error('Stack trace:', error.stack);
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
                        Thêm nhà
                </Text>
                
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Description:
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

                        placeholder="Nhập description của nhà..."
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Address:
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

                        placeholder="Nhập địa chỉ của nhà..."
                        onChangeText={text => setAddress(text)}
                        value={address}
                    />
                </View>
                
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Phone number:
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

                        placeholder="Nhập số điện thoại của nhà..."
                        onChangeText={text => setPhoneNumber(text)}
                        value={phoneNumber}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, }}>
                        <Text 
                            style={{
                                marginHorizontal: 26,
                                marginVertical: 8,
                                fontSize: 16,
                            }}>
                            Rent price:
                        </Text>
                        <TextInput
                        style={{ 
                            marginLeft: 18,
                            borderWidth: 1, 
                            borderColor: 'gray', 
                            padding: 10,
                            borderRadius: 30,
                            paddingHorizontal: 16,
                            width: "90%",
                            alignSelf: 'center',
                        }}
                            keyboardType='numeric'
                            placeholder="Nhập giá thuê ..."
                            onChangeText={text => setRentPrice(text)}
                            value={rentPrice}
                        />
                    </View>

                    <View style={{flex: 1}}>
                        <Text 
                            style={{
                                marginHorizontal: 4,
                                marginVertical: 8,
                                fontSize: 16,
                            }}>
                            Room count:
                        </Text>
                        <TextInput
                            style={{ 
                                marginRight: 18,
                                borderWidth: 1, 
                                borderColor: 'gray', 
                                padding: 10,
                                borderRadius: 30,
                                paddingHorizontal: 16,
                                width: "90%",
                                alignSelf: 'center',
                            }}
                            keyboardType='numeric'
                            placeholder="Nhập số phòng..."
                            onChangeText={text => setRoomCount(text)}
                            value={roomCount}
                        />
                    </View>
                </View>

                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={handleCategorySelectionChange}
                        style={{ height: 50, width: '90%', alignSelf:"center" }}
                    >
                        <Picker.Item label="Choose category..." value={null} />
                        {categories && categories.map((category) => (
                            <Picker.Item key={category.id} label={category.category_name} value={category.id} />
                        ))}
                    </Picker>

                <TouchableOpacity 
                style={{
                    top: 30,
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    paddingVertical: 14,
                    width: "90%",
                    alignSelf: "center",
                }} onPress={handlePostHouseSubmit}>
                    <Text 
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: COLORS.white,
                        alignSelf: "center",
                    }}>
                        Đăng bài
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

export default CreatePost;
