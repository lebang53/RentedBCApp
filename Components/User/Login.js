import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../../configs/http";
import COLORS from "../Home/Constants";
import UserStyles from "./UserStyles";
import { UserContext } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authenticationAPI from "../../apis/authentication";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const res = await authenticationAPI.login(
                username,password
            );
            const data = res.data;
            console.log(data?.user);
            console.log(data?.access);
            if (res.status == 200) {
                setUserInfo(data)  // save global info
                AsyncStorage.setItem("access", data?.access); // save in storage
                AsyncStorage.setItem("refresh", data?.refresh);
                console.log("Đăng nhập thành công");
                navigation.navigate("Home")
            } else {
                setError(data.message || "Đăng nhập không thành công");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error);
            setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
        finally{
            setIsLoading(false)
        }
    };

    return ( 
            <SafeAreaView style={{justifyContent: 'center', flex: 1, paddingTop: 50}}>
                <View style={UserStyles.subject} >
                    <View>
                        <Text style={UserStyles.Text}>
                            WELCOME BACK {''}
                             <Text style={UserStyles.Text2}>
                            Have a good day!
                        </Text>
                        </Text>
                    </View>
                    <View>
                   
                    </View>
                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Username
                        </Text>
                        <View style={UserStyles.TextInput}>
                            <TextInput 
                            placeholder="Enter your username"
                            onChangeText={text => setUsername(text)}
                            value={username}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Password
                        </Text>
                        <View style={UserStyles.TextInput}>
                            <TextInput 
                            placeholder="Enter your password"
                            onChangeText={text => setPassword(text)}
                            value={password}
                            style={{width: "100%"}}
                            secureTextEntry={isPasswordShown}
                            />
                            <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12,
                            }}>
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <TouchableOpacity style={UserStyles.Opa} onPress={handleLogin}>
                        <Text style={UserStyles.Text4}>
                           Sign in
                        </Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 22,

                    }}>
                        <Text style={UserStyles.Text3}>Don't have an account</Text>
                        <Pressable
                        onPress={() => navigation.navigate("Register")}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginVertical: 6,
                                marginLeft: 6,
                                color: COLORS.primary
                            }}>
                                Sign up
                            </Text>
                        </Pressable>
                    </View>
                </View>
                {isLoading && (
                <View style={UserStyles.loadingIndicator}>
                    <ActivityIndicator size={60} color="#0000ff" />
                </View>
            )}
            </SafeAreaView>
    );
};

export default Login;
