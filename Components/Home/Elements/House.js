import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import axios from 'axios';
import { API_BASE, HOUSE, POST } from '../../../constants/api';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../context/userContext';
import { ScrollView } from 'react-native';

const House = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const { userInfo, isAuthenticated } = useContext(UserContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (isAuthenticated()) {
                    const response = await axios.get(`${API_BASE}${POST}`, {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    });
                    setPosts(response.data.results);
                    console.log(response.data.results);
                } else {
                    console.log('Người dùng chưa được xác thực');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchPosts();
    }, []);
    const renderItem = ({ item }) => (
        <Pressable
        onPress={() => navigation.navigate('HouseDetails', { posts: item })}
            style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                marginVertical: 10,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                paddingHorizontal: 12,
                paddingVertical: 22,
            }}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'center',
                }}
            />
            <Text>{item.content}</Text>
            <Text style={{ marginTop: 8 }}>{item.address}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Text>{item.rent_price}$</Text>
                <Text> | </Text>
                <Text>room: {item.room_count}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={{
            paddingHorizontal: 2,
            flex: 1 
        }}>
        
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {posts.map(item => (
                    <Pressable 
                        key={item.id}
                        onPress={() => navigation.navigate("HouseDetails", {posts: item})}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            marginVertical: 10,
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 7,
                            paddingHorizontal: 12,
                            paddingVertical: 20,
                            width: '48%', 
                            marginLeft: '1%', 
                            marginRight: '1%', 
                        }}>
                        <Image
                            source={item.image} 
                            style={{ 
                                width: 150,
                                height: 150,
                                resizeMode: "center"
                            }}/>
                        <Text style={{alignContent: "center"}}>{item.content}</Text>
                        <Text style={{ marginTop: 8}}>{item.house.address}</Text>
                        <View style={{flexDirection: "row", marginTop: 8}}>
                            <Text>{item.house.rent_price}$</Text>
                            <Text> | </Text>
                            <View>
                                <Text>room: {item.house.room_count}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    </View>
    );
};

export default House;
