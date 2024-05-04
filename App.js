import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home/Home';
import Login from './Components/User/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Components/User/Register';
import Welcome from './Components/Welcome/Welcome';
import HouseDetails from './Components/Home/Elements/HouseDetails';
import SearchDetails from './Components/Search/SearchDetails';
import Notifications from './Components/Home/Notifications';
import Storage from './Components/Home/Storage';
import Management from './Components/User/Management';
import UserProfile from './Components/User/UserProfile';
import { UserProvider } from './context/userContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const setLoginStatus = (status) => {
  //   setIsLoggedIn(status);
  // };
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HouseDetails" component={HouseDetails} />
          <Stack.Screen name="SearchDetails" component={SearchDetails} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Storage" component={Storage} />
          <Stack.Screen name="Management" component={Management} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
        {/* <Drawer.Navigator>
          <Drawer.Screen name='Register' component={Register} />
          <Drawer.Screen name='Login' component={Login} />
          <Drawer.Screen name='Home' component={Home} />
        </Drawer.Navigator> */}
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: 50,
    fontWeight: "bold",
  },
  txt2: {
    fontSize: 30,

  }
});
