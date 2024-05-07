import axiosInstance from "../configs/http"
const registerAPI = {
    async register(firstname, lastname, email, username, password, )  {
        const res = await axiosInstance.post("/users/", {
            firstname, lastname, email, username, password
        })
        return res;
    },
    
}

export default registerAPI