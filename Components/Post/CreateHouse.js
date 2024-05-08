import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios'; // Import axios để gửi request đến API
import { Picker } from '@react-native-picker/picker';
import { API_BASE, CREATE_POST, HOUSE } from '../../constants/api';
import { UserContext } from '../../context/userContext';

const CreateHouse = () => {
    const [postContent, setPostContent] = useState('');
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [houses, setHouses] = useState([]);
    const { userInfo, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    const fetchHouses = async () => {
        try {
          const response = await axios.get(`${API_BASE}${HOUSE}`); 
          setHouses(response.data.results); 
        } catch (error) {
          console.error('Lỗi khi lấy danh sách nhà:', error);
        }
      };

    fetchHouses();
    }, []);

    const handlePostContentChange = (text) => {
        console.log(text)
        setPostContent(text);
    };

    const handleHouseSelectionChange = (houseId) => {
        console.log(houseId)
        setSelectedHouse(houseId);
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
    
        try {
            if (isAuthenticated()) {
                const response = await axios.post(`${API_BASE}${CREATE_POST}`, {
                    content: postContent,
                    house_id: selectedHouse,
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
        }
    };
  

  return (
    <View style={{ flex: 1, padding: 20, top: 20}}>
        <Text>Tạo nhà</Text>
        <TextInput
            style={{ height: 100, borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding: 10 }}
            placeholder="Nhập nội dung bài post..."
            multiline
            value={postContent}
            onChangeText={handlePostContentChange}
        />

            <Picker
            selectedValue={selectedHouse}
            onValueChange={handleHouseSelectionChange}
            style={{ height: 50, width: '100%', marginBottom: 20 }}
            >
            <Picker.Item label="Chọn nhà của bạn" value={null} />
            {houses && houses.map((house) => (
                <Picker.Item key={house.id} label={house.description} value={house.id} />
            ))}
            </Picker>


        <Button
            title="Đăng bài"
            onPress={handlePostSubmit}
        />
    </View>
  );
};

export default CreateHouse;
