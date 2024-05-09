import { ActivityIndicator, Alert, Button, Image, Pressable, Text, TextInput, Touchable, TouchableOpacity, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UserStyles from "./UserStyles"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import COLORS from "../Home/Constants"
import { Ionicons } from "@expo/vector-icons"
import registerAPI from "../../apis/register"

const Register = ( {navigation} ) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted'){
            Alert.alert('Quyền bị từ chối!', 'Bạn cần phải cho phép quyền truy cập hình ảnh.');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        console.log(result)
        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    }
    
    const handleRegister = async () => {
        if (!firstname.trim()) {
        alert('Vui lòng nhập tên.');
        return;
        }
    
        if (!lastname.trim()) {
        alert('Vui lòng nhập họ.');
        return;
        }

        if (!username.trim()) {
        alert('Vui lòng nhập username.');
        return;
        }
    
        if (!password.trim()) {
        alert('Vui lòng nhập password.');
        return;
        }

        if (!email.trim()) {
        alert('Vui lòng nhập email.');
        return;
        }
        if (!avatar.trim()) {
        alert('Vui lòng thêm avatar.');
        return;
        }
        try {
            setIsLoading(true)
            const res = await registerAPI.register(
                firstname, lastname, email, username, password, avatar
            );
            console.log("avatar",avatar)
            const data = res.data;
            console.log(data?.user);
            if (res.status == 200) {
                setUserInfo(data)
                console.log("Đăng ký thành công");
                navigation.navigate("Login")
            } else {
                setError(data.message || "Đăng ký không thành công");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
        }
        finally{
            setIsLoading(false)
        }
    };
    

    return (
            <SafeAreaView style={{flex: 1}}>
                <View style={UserStyles.subject} >
                    <View>
                        <Text style={UserStyles.Text}>
                            CREATE ACCOUNT
                        </Text>
                        <Text style={UserStyles.Text2}>
                            Connect with our Landlord today!
                        </Text>
                    </View>

                    <View>
                   
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            First name
                        </Text>
                        <View style={UserStyles.TextInput}>
                            <TextInput 
                            placeholder="Enter your first name"
                            onChangeText={text => setFirstname(text)}
                            value={firstname}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Last name
                        </Text>
                        <View style={UserStyles.TextInput}>
                            <TextInput 
                            placeholder="Enter your last name"
                            onChangeText={text => setLastname(text)}
                            value={lastname}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    {/* <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Phone number
                        </Text>
                        <View style={UserStyles.TextInputPhone}>
                            <TextInput 
                            placeholder="+84"
                            placeholderTextColor={COLORS.black}
                            keyboardType="numeric"
                            //set Phone number
                            style={{width: "12%",
                                    borderRightWidth: 1,
                                    borderRightColor: COLORS.black,
                                    height: "100%"
                                    }}
                            />
                            <TextInput 
                            placeholder="Enter your phone number"
                            keyboardType="numeric"
                            style={{width: "82%",
                                    
                                    }}
                            />
                        </View>
                    </View> */}

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Email address
                        </Text>
                        <View style={UserStyles.TextInput}>
                            <TextInput 
                            keyboardType="email-address"
                            placeholder="Enter your email address"
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={{width: "100%"}}
                            />
                        </View>
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

                    <View>
                        <View style={{marginBottom:8}}>
                            <Text style={UserStyles.Text3}>
                                Avatar
                            </Text>
                            <TouchableOpacity onPress={pickImage} style={UserStyles.TextInput}>
                                <Text>Choose avatar</Text>
                            </TouchableOpacity>
                        </View>
                        {avatar && <Image source={{uri: avatar}} style={{ width: 100, height:100,}} />}
                    </View>

                    <TouchableOpacity style={UserStyles.Opa} onPress={ handleRegister }>
                        <Text style={UserStyles.Text4}>
                            Sign up
                        </Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 22,

                    }}>
                        <Text style={UserStyles.Text3}>Already have an account</Text>
                        <Pressable
                        onPress={() => navigation.navigate("Login")}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginVertical: 6,
                                marginLeft: 6,
                                color: COLORS.primary
                            }}>
                                Login
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
}
export default Register
