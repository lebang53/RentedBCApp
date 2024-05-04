import React, { useState } from "react";
import { View, Text, StatusBar, TextInput, Pressable, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../Carousel";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import COLORS, { Houses } from "../Home/Constants";
import { Picker } from "@react-native-picker/picker";

const SearchDetails = ({ navigation }) => {
    const [keyword, setKeyword] = useState("");
    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [select3, setSelect3] = useState("");
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
    const handleSearch = () => {
        // Pass location and keyword to parent component for searching
        onSearch({ location, keyword });
    }
    return (
        <>
            <StatusBar translucent backgroundColor="#fff" />
            <SafeAreaView>
                <View>
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

                            {/* Add the search button here */}
                            {/* <TouchableOpacity onPress={handleSearch}>
                                <Text></Text>
                            </TouchableOpacity> */}
                        </View>
                        
                        <View 
                        style={{ 
                            paddingHorizontal: 20, 
                            paddingBottom: 20,
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
                                selectedValue={select1}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelect1(itemValue);
                                }}>
                                <Picker.Item label="Chọn mức giá..." value="default" />
                                <Picker.Item label="1000000" value="1000000" />
                                <Picker.Item label="2000000" value="000000" />
                            </Picker>

                            <Picker
                                selectedValue={select1}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelect1(itemValue);
                                }}>
                                <Picker.Item label="Chọn quận/huyện/thành phố" value="default" />
                                <Picker.Item label="Nhà Bè" value="Nhà Bè" />
                                <Picker.Item label="TP. HCM" value="TP. HCM" />
                            </Picker>
                        </View>

                    </View>
                    
                    <View style={{
                            paddingHorizontal: 10,
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "700",
                        }}>
                            Các nhà ở nổi bật
                        </Text>
                        <View style>
                            <FlatList  data={Houses} renderItem={ ({ item }) => 
                            <Pressable 
                            onPress={() => navigation.navigate("HouseDetails", {house: item})}
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
                            }}>
                                <FontAwesome name="shopping-cart"/>
                                <Image
                                source={item.image} 
                                style={{ 
                                    width: 150,
                                    height: 150,
                                    resizeMode: "center"
                                }}/>
                                <Text>{item.name}</Text>
                                <Text style={{ marginTop: 8}}>{item.address}</Text>
                                <View style={{flexDirection: "row", marginTop: 8}}>
                                    <Text>{item.rent_price}$</Text>
                                    <Text> | </Text>
                                    <View>
                                        <Text>room: {item.room_count}</Text>
                                    </View>
                                </View>
                            </Pressable>} 
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between"
                            }}
                            showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

export default SearchDetails;


