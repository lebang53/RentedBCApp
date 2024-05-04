import HomeStyles from "./HomeStyles"
import { View, Text, TextInput, StatusBar } from 'react-native';
import React from "react";
import Header from "./Elements/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Search from "./Elements/Search";
import Category from "./Elements/Category";
import House from "./Elements/House";

const Home = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={HomeStyles.subject}>
        <Header headerText={"Hi, Bang "} headerIcon={"bell-o"}/>
        <Search icon={"search"} />
        
        {/* Categories */}
        <View>
          <Text style={HomeStyles.Text}>Categories</Text>
          <Category/>
        </View>

        {/* House */}
        <View style={HomeStyles.Element}>
          <Text style={HomeStyles.Text}>Houses</Text>
          <House />
        </View>
      </SafeAreaView>
    </>
  )
}
export default Home