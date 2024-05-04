import { Text, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

const Header = ({ headerText, headerIcon , navigation}) => {
    const {isAuthenticated} = useContext(UserContext);
    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={{ flex:1, fontSize: 20, fontWeight: "700" }}>
                {
                    isAuthenticated() && 
                    <FontAwesome name={'user'} size={32} color="#8BD8A2" onPress={() => navigation.navigate("UserProfile")} /> 
                }
                {'  '}
                {headerText}
            </Text> 
            <FontAwesome name={headerIcon} size={32} color="#8BD8A2"/>
        </View>
    );
};
export default Header