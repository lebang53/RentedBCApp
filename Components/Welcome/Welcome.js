import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeStyles from "./WelcomeStyles";
import Carousel from "../Carousel";

const Welcome = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselData = [
        {
            id: 1,
            image: require("../../assets/images/welcome/welcome4.jpg"),
        },
        {
            id: 2,
            image: require("../../assets/images/welcome/welcome2.jpg"),       
        },
        {
            id: 3,
            image: require("../../assets/images/welcome/welcome3.jpg"),        
        },
        {
            id: 4,
            image: require("../../assets/images/welcome/welcome1.jpg"),        
        },
        {
            id: 5,
            image: require("../../assets/images/welcome/welcome5.jpg"),        
        },
    ];
    const renderDotIndicator = () => {
        return carouselData.map((dot, index) => {
            if(activeIndex === index) {
                return (
                    <View 
                    style={{
                        backgroundColor: "#019012",
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
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <SafeAreaView style={WelcomeStyles.View}>
                <Carousel carouselData={carouselData} height={400}  />
                <Text 
                    style={WelcomeStyles.Text}>
                        RentedBC - Tìm trọ, căn hộ, nhà ở
                </Text>
                <Text style={WelcomeStyles.Text2}>
                    RentedBC luôn đồng hành cùng bạn, giúp tìm kiếm
                </Text>
                <Text>
                    nhà ở & cải thiện chất lượng cuộc sống
                </Text>

                <TouchableOpacity style={WelcomeStyles.Opa} onPress={ () => navigation.navigate("Home")}>
                    <Text style={WelcomeStyles.Text3}>
                        Let's Go
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={WelcomeStyles.Opa} onPress={ () => navigation.navigate("Login")}>
                    <Text style={WelcomeStyles.Text3}>
                    Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={WelcomeStyles.Opa} onPress={ () => navigation.navigate("Management")}>
                    <Text style={WelcomeStyles.Text3}>
                        Search
                    </Text>
                </TouchableOpacity>
                {/* <Text style={{
                    marginTop: 155
                }}>
                    CopyRight @ RentedBC 2024
                </Text> */}
            </SafeAreaView>
        </>
    );
}

export default Welcome;