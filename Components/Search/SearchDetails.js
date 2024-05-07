import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Pressable, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../Carousel";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import COLORS, { Houses } from "../Home/Constants";
import { Picker } from "@react-native-picker/picker";
import { API_BASE, HOUSE, POST } from "../../constants/api";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const SearchDetails = ({ navigation }) => {
    const [keyword, setKeyword] = useState("");
    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [select3, setSelect3] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE}${HOUSE}`, {
                params: {
                    keyword: keyword,
                    address: select3,
                    room_count: select1,
                    rent_price: select2,
                }
            });

            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching houses:', error);
        }
    };

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

    const carouselData = [
        {
            id: 1,
            image: require("../../assets/images/welcome/welcome4.jpg"),
        },
        {
            id: 2,
            image: require("../../assets/images/welcome/welcome2.jpg"),        },
        {
            id: 3,
            image: require("../../assets/images/welcome/welcome3.jpg"),        },
        {
            id: 4,
            image: require("../../assets/images/welcome/welcome1.jpg"),        },
        {
            id: 5,
            image: require("../../assets/images/welcome/welcome5.jpg"),        },
    ];

    return (
        <>
            <StatusBar translucent backgroundColor="#fff" />
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{height: 300, position: 'relative'}} >
                        <Carousel carouselData={carouselData} />
                    </View>
                    
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 7,
                    }}>
                        <View
                        style={{
                            borderColor: COLORS.grey,
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            paddingVertical: 12,
                            borderRadius: 30,
                            paddingHorizontal: 16,
                            marginVertical: 12,
                            position: "absolute",
                            top: -70,
                            zIndex: 1,
                            width: "90%",
                            alignSelf: 'center',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.3 }}>
                                <FontAwesome name="map-marker" size={24} color="#8BD8A2" />
                                <Text
                                    style={{
                                        paddingLeft: 8,
                                        fontSize: 16,
                                        color: "#808080",
                                        flex: 1
                                    }}
                                >
                                    Location
                                </Text>
                            </View>

                            <View style={{ width: 1, backgroundColor: '#C4C4C4', marginHorizontal: 10 }} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.7 }}>
                                <FontAwesome name="search" size={24} color="#8BD8A2" />
                                <TextInput
                                    placeholder="Search by keyword"
                                    style={{
                                        paddingLeft: 8,
                                        fontSize: 16,
                                        color: "#808080",
                                    }}
                                    value={keyword}
                                    onChangeText={setKeyword}
                                />
                            </View>
                        </View>
                        
                        <View 
                        style={{ 
                            paddingHorizontal: 20, 
                            paddingBottom: 30,
                            backgroundColor: "#fff",
                            width: "94%", 
                            alignSelf: 'center',
                            borderRadius: 8,
                            top: -30,
                            paddingTop: 30,
                        }}>
                            <Picker
                                selectedValue={select1}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelect1(itemValue);
                                }}>
                                <Picker.Item label="Chọn số người ở..." value="default" />
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                            </Picker>

                            <Picker
                                selectedValue={select2}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelect2(itemValue);
                                }}>
                                <Picker.Item label="Chọn mức giá..." value="default" />
                                <Picker.Item label="1000000" value="1000000" />
                                <Picker.Item label="2000000" value="2000000" />
                            </Picker>

                            <Picker
                                selectedValue={select3}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelect3(itemValue);
                                }}>
                                <Picker.Item label="Chọn quận/huyện/thành phố" value="default" />
                                <Picker.Item label="Nhà Bè" value="Nhà Bè" />
                                <Picker.Item label="TP. HCM" value="TP. HCM" />
                            </Picker>
                        </View>

                    </View>
                    
                    <View 
                    style={{ 
                        bottom: 0, 
                        width: '100%', 
                        flexDirection: 'row', 
                        justifyContent: 'space-around', 
                        marginBottom: -20,
                        top: -50,
                        }}>
                        <TouchableOpacity onPress={ handleSearch } 
                        style={{ 
                            backgroundColor: COLORS.primary, 
                            padding: 10, 
                            borderRadius: 30, 
                            width: "48%",
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center'
                            }}>
                            <Ionicons name="search-outline" size={24} color={COLORS.white} />
                            <Text style={{ color: 'white' }}>Tìm phòng</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={{
                            paddingHorizontal: 10,
                            flex: 1 
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                        }}>
                            Các nhà ở nổi bật
                        </Text>
                        <View style={{flex: 1}}>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {posts.map(item => (
                                    <Pressable 
                                        key={item.id}
                                        onPress={() => navigation.navigate("HouseDetails", {houses: item}, {posts: item})}
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
                 
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default SearchDetails;


