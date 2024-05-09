import axiosInstance from "../configs/http"
const registerAPI = {
    async register(firstname, lastname, email, username, password, avatar )  {
        const res = await axiosInstance.post("/users/", {
            firstname, lastname, email, username, password, avatar
        })
        return res;
    },
    
}

export default registerAPI