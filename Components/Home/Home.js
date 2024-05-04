import HomeStyles from "./HomeStyles"
import { View, Text, TextInput, StatusBar } from 'react-native';
import React, { useContext } from "react";
import Header from "./Elements/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Search from "./Elements/Search";
import Category from "./Elements/Category";
import House from "./Elements/House";
import { UserContext } from "../../context/userContext";
import TabBar from "../TabBar";
import authenticationAPI from "../../apis/authentication";

const Home = ({navigation}) => {
  const {userInfo, isAuthenticated} = useContext(UserContext);
  const lastName = isAuthenticated() ? userInfo?.user.last_name : 'Bạn'
  // authenticationAPI.reLogin();
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={HomeStyles.subject}>
        <Header headerText={`Hi, ${lastName}`} headerIcon={"bell-o"} navigation={navigation}/>
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
        <TabBar tabs={["Home", "Search", "Storage", "Profile"]} navigation={navigation}/>
      </SafeAreaView>
    </>
  )
}
export default Home