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
import { useRoute } from "@react-navigation/native";

const SearchResults = ({ navigation }) => {
    const route = useRoute();
    const searchResults = route.params?.searchResults;

    return (
        <>
            <StatusBar translucent backgroundColor="#fff" />
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    
                    <View style={{
                            paddingHorizontal: 10,
                            flex: 1 
                        }}>
                        <Text style={{
                            padding: 10,
                            fontSize: 22,
                            fontWeight: "700",
                        }}>
                            Kết quả tìm kiếm:
                        </Text>
                        <View style={{flex: 1}}>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {searchResults.map(item => (
                                    <Pressable 
                                        key={item.id}
                                        // onPress={() => navigation.navigate("HouseDetails", {posts: item})}
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
                                        <Text style={{ marginTop: 8}}>{item.address}</Text>
                                        <View style={{flexDirection: "row", marginTop: 8}}>
                                            <Text>{item.rent_price}$</Text>
                                            <Text> | </Text>
                                            <View>
                                                <Text>room: {item.room_count}</Text>
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

export default SearchResults;


