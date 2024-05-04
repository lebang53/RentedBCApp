import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../configs/http"
import {checkExpireToken} from '../utils/common'
const authenticationAPI = {
    async login(username, password)  {
        const res = await axiosInstance.post("/users/login/", {
            username,password
        })
        return res;
    },
    async reLogin(){
        const access = await AsyncStorage.getItem("access");
        const refresh = await AsyncStorage.getItem("refresh");
        console.log("relogin", access);
        console.log("relogin", refresh);
        if (access != null && access != '' && checkExpireToken(access)){
            // get current user and set info 

        }

    }
    
}

export default authenticationAPI