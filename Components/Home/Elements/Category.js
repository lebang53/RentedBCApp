import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { API_BASE, CATEGORY } from '../../../constants/api';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

const Category = ({ onPressCategory }) => {
    const [categories, setCategories] = useState([]);
    const { userInfo, isAuthenticated } = useContext(UserContext);

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
                    console.log(response.data.results);
                } else {
                    console.log('Người dùng chưa được xác thực');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            // onPress={() => onPressCategory(category)}
                            style={{
                                backgroundColor: '#8BD8A2',
                                marginRight: 30,
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 16,
                                marginVertical: 12,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 7,
                            }}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>{category.category_name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>Bạn chưa đăng nhập</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default Category;
