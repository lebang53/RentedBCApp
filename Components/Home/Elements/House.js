import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Houses } from "../Constants";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const House = () => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList data={Houses} renderItem={ ({ item }) => 
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
                paddingVertical: 22,
            }}>
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
    );
};
export default House