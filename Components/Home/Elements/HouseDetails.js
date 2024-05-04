import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../Constants";

const HouseDetails = ({ navigation }) => {
    const route = useRoute();
    const house = route.params?.house;
    const flatListRef = useRef();

    const screenWidth = Dimensions.get("window").width;

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1){
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                })
            } else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true,
                })
            };
        }, 2000);
        
        return () => clearInterval(interval);
    });

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    });

    const carouselData = [
        {
            id: 1,
            image: require("../../../assets/images/hinh1.jpg"),
        },
        {
            id: 2,
            image: require("../../../assets/images/hinh4.jpg"),
        },
        {
            id: 3,
            image: require("../../../assets/images/hinh1.jpg"),
        },
        {
            id: 4,
            image: require("../../../assets/images/hinh4.jpg"),
        },
    ];
    const renderItem = ({ item, index }) => {
        return <View>
            <Image source={item.image} style={{height:200, width: screenWidth}} />
        </View>
    }

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.ceil(scrollPosition / screenWidth);
        setActiveIndex(index);
    }

    const renderDotIndicator = () => {
        return carouselData.map((dot, index) => {
            if(activeIndex === index) {
                return (
                    <View 
                    style={{
                        backgroundColor: "green",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
                    </View>
                );
            } else {
                return (
                    <View 
                    key={index}
                    style={{
                        backgroundColor: "#CCCCCC",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
    
                    </View>
                );
            }

        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", marginVertical: 6, alignItems: "center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}
                    style={{
                        padding: 10,
                        borderRadius: 50, 
                        borderColor: COLORS.primary, 
                        borderWidth: 2, 
                        width: 50,
                        marginHorizontal: 8
                    }}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                    </TouchableOpacity>

                    <Text 
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                    }}>
                        {house.name}
                    </Text>
                </View>
                <View>
                    <FlatList 
                    ref={flatListRef}
                    data={carouselData} 
                    getItemLayout={getItemLayout}
                    renderItem={renderItem} 
                    keyExtractor={(item) => item.id}
                    horizontal={true} 
                    pagingEnabled={true} 
                    onScroll={handleScroll}
                    showsHorizontalScrollIndicator={false}
                    />
                    <View
                    style={{
                        flexDirection: "row", 
                        justifyContent: 'center',
                        marginTop: 15,
                    }}>
                        {renderDotIndicator()}
                    </View>
                </View>
                <View 
                style={{
                    marginVertical: 12,
                    marginHorizontal: 12,
                }}>
                    <Text 
                    style={{ 
                        fontWeight: "bold", 
                        fontSize: 20,
                    }}>
                            <Ionicons name="shield-checkmark-outline" size={16}/> {house.description}
                    </Text>
                    <Text>
                        <Ionicons name="location-outline" size={16}  /> {house.address}
                    </Text>
                    <View style={{ flexDirection: "row"}}>
                        <Text>
                            Giá thuê: {house.rent_price}
                        </Text>
                        <Text style={{ paddingLeft: 120}}>
                            Số phòng: {house.room_count}
                        </Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20}}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        borderRadius: 15, 
                        borderWidth: 1,
                        borderColor: COLORS.grey,
                        }}>
                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4, 
                            width: 115, 
                            borderRightWidth: 1,
                            borderColor: COLORS.grey,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="map-outline" size={24} color="black" />
                            <Text>Đường đi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4,
                            width: 115, 
                            borderRightWidth: 1,
                            borderColor: COLORS.grey,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="share-social-outline" size={24} color="black" />
                            <Text>Chia sẽ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4, 
                            width: 115,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="flag-outline" size={24} color="black" />
                            <Text>Báo cáo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 16}}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        borderRadius: 15, 
                        width: "94%",
                        height: 90,
                        backgroundColor: "#ccffd0"
                        }}>
                        <Image source={require("../../../assets/images/khoc1.png")} style={{ width: 50, height: 50, borderRadius: 25, marginHorizontal: 10 }} />

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 16, fontWeight: "600"}}>Chủ nhà: LeBang</Text>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>0375574702</Text>
                        </View>

                        <TouchableOpacity 
                        style={{
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            backgroundColor: "#007bff", 
                            borderRadius: 20, 
                            marginRight: 10 
                            }}>
                            <Ionicons name="call" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{
                            marginRight: 10, 
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            backgroundColor: "#28a745", 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chatbubble" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                
                <View 
                style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%', 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    padding: 16,
                    }}>
                    <TouchableOpacity onPress={() => console.log('Button 2 pressed')} 
                    style={{ 
                        backgroundColor: COLORS.primary, 
                        padding: 10, 
                        borderRadius: 30, 
                        width: "48%",
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                        }}>
                        <Ionicons name="cart-outline" size={24} color={COLORS.white} />
                        <Text style={{ color: 'white' }}>Đặt phòng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Button 3 pressed')} 
                    style={{ 
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        padding: 10, 
                        borderRadius: 30, 
                        width: "48%",
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                        }}>
                        <Ionicons name="bookmark-outline" size={24} color={COLORS.primary} />
                        <Text style={{ color: COLORS.primary }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </SafeAreaView>
    );
};
export default HouseDetails