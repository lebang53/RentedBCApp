import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Categories } from "../Constants"

const Category = () => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    Categories.map((category, index) => {
                        return <View
                        style={{ 
                            backgroundColor: "#8BD8A2", 
                            marginRight: 30, 
                            borderRadius: 8,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            marginVertical: 12,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 7,
                        }}>
                            <TouchableOpacity>
                                <Text style={{color: "#fff", fontSize: 16,}}>
                                    {category.category}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </ScrollView>
        </View>
    );
};
export default Category