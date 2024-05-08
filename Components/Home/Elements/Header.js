import { Text, TouchableOpacity, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import COLORS from "../Constants";

const Header = ({ headerText, headerIcon , navigation}) => {
    const {isAuthenticated} = useContext(UserContext);
    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={{ flex:1, fontSize: 20, fontWeight: "700" }}>
                {
                    isAuthenticated() && 
                    <FontAwesome name={'user'} size={32} color={COLORS.primary} onPress={() => navigation.navigate("UserProfile")} /> 
                }
                {'  '}
                {headerText}
            </Text> 
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <FontAwesome name={headerIcon} size={32} color={COLORS.primary}/>
            </TouchableOpacity>
        </View>
    );
};
export default Header