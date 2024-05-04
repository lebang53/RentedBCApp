import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import AppStyles from "../../styles/AppStyles";
import UserStyles from "./UserStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../Home/Constants";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);

    const handleLogin = async () => {
        try {
            const response = await fetch("https://lebang53.pythonanywhere.com/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Đăng nhập thành công");
            } else {
                setError(data.message || "Đăng nhập không thành công");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error);
            setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
    };

    return ( 
        <LinearGradient style={{flex: 1, paddingTop: 50}} colors={[COLORS.secondary, COLORS.white]}>
            <SafeAreaView style={{justifyContent: 'center', flex: 1, paddingTop: 50}}>
                <View style={UserStyles.subject} >
                    <View>
                        <Text style={UserStyles.Text}>
                            WELCOME BACK!
                        </Text>
                        <Text style={UserStyles.Text2}>
                            Have a good day!
                        </Text>
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
                    <TouchableOpacity style={UserStyles.Opa} onPress={ () => navigation.navigate("Register")}>
                        <Text style={UserStyles.Text4}>
                            Sign up
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
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Login;
