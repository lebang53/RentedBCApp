import React, { useContext, useEffect } from "react";
import { Alert, BackHandler, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/userContext";
import TabBar from "../TabBar";
import Category from "./Elements/Category";
import Header from "./Elements/Header";
import House from "./Elements/House";
import Search from "./Elements/Search";
import HomeStyles from "./HomeStyles";

const Home = ({ navigation }) => {
  const { userInfo, isAuthenticated } = useContext(UserContext);
  const lastName = isAuthenticated() ? userInfo?.user.last_name : 'Bạn';

  // useEffect(() => {
  //   const backAction = () => {
  //     return true; 
  //   };

  //   const backHandler = navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //   });

  //   navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //     Alert.alert(
  //       'Confirmation',
  //       'Are you sure you want to exit the app?',
  //       [
  //         { text: 'Cancel', onPress: () => {} },
  //         { text: 'OK', onPress: () => BackHandler.exitApp() }
  //       ],
  //       { cancelable: false }
  //     );
  //   });

  //   return () => backHandler.remove();
  // }, [navigation]);

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
export default Home;
