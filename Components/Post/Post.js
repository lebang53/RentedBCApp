import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Import axios để gửi request đến API
import { Picker } from '@react-native-picker/picker';
import { API_BASE, CREATE_POST, HOUSE } from '../../constants/api';
import { UserContext } from '../../context/userContext';
import COLORS from '../Home/Constants';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [houses, setHouses] = useState([]);
    const { userInfo, isAuthenticated } = useContext(UserContext);
    const [selectedHouseInfo, setSelectedHouseInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get(`${API_BASE}${HOUSE}`); 
                console.log("hehe:",response.data);
                setHouses(response.data); 
            } catch (error) {
            console.error('Lỗi khi lấy danh sách nhà:', error);
            }
        };
    fetchHouses();
    }, []);

    const handleHouseSelectionChange = (houseId) => {
        setSelectedHouse(houseId);
        const selectedHouseData = houses.find(house => house.id === houseId);
        setSelectedHouseInfo(selectedHouseData);
    };

    const handlePostContentChange = (text) => {
        console.log(text)
        setPostContent(text);
    };


    const handlePostSubmit = async () => {
        if (!selectedHouse) {
        alert('Vui lòng chọn nhà trước khi đăng bài.');
        return;
        }
    
        if (!postContent.trim()) {
        alert('Vui lòng nhập nội dung bài post.');
        return;
        }
        setIsLoading(true)
        try {
            // console.log(isAuthenticated());
            if (isAuthenticated()) {
                // console.log("postContent", postContent);
                // console.log("selectedHouse", selectedHouse);
                // console.log(userInfo.access);
                const response = await axios.post(`${API_BASE}${CREATE_POST}`, {
                    content: postContent,
                    house_id: 1,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    }
                );
                console.log(response.data)
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
                        Đăng bài viết
                </Text>
                
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Title:
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

                        placeholder="Nhập title bài post..."
                        // multiline
                        // value={postContent}
                        // onChangeText={handlePostContentChange}
                    />
                </View>
                
                <View>
                    <Text 
                        style={{
                            marginHorizontal: 26,
                            marginVertical: 8,
                            fontSize: 16,
                        }}>
                        Content:
                    </Text>
                    <TextInput
                        style={{ 
                            height: 100,
                            borderWidth: 1, 
                            borderColor: 'gray', 
                            padding: 10,
                            borderRadius: 30,
                            paddingHorizontal: 16,
                            width: "90%",
                            alignSelf: 'center',
                        }}

                        placeholder="Nhập nội dung bài post..."
                        multiline
                        value={postContent}
                        onChangeText={handlePostContentChange}
                    />
                </View>
                
                        
                <Picker
                    selectedValue={selectedHouse}
                    onValueChange={handleHouseSelectionChange}
                    style={{ height: 50, width: '90%', alignSelf:"center" }}
                >
                    <Picker.Item label="Choose house..." value={null} />
                    {houses && houses.map((house) => (
                        <Picker.Item key={house.id} label={house.description} value={house.id} />
                    ))}
                </Picker>

                {selectedHouseInfo && (
                    <View style={{margin: 20, margin: 22}}>
                        <Text style={{fontSize: 16}}>Thông tin nhà:</Text>
                        <Text style={{fontSize: 16}}>ID: {selectedHouseInfo.id}</Text>
                        <Text style={{fontSize: 16}}>Description: {selectedHouseInfo.description}</Text>
                        <Text style={{fontSize: 16}}>Address: {selectedHouseInfo.address}</Text>
                        <Text style={{fontSize: 16}}>Room: {selectedHouseInfo.room_count}</Text>
                        <Text style={{fontSize: 16}}>Rent: {selectedHouseInfo.rent_price}</Text>
                    </View>
                )}

                <TouchableOpacity 
                style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    paddingVertical: 14,
                    width: "90%",
                    alignSelf: "center",
                }} onPress={handlePostSubmit}>
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
                    <ActivityIndicator size={60} color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default CreatePost;
