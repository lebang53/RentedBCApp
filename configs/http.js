import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE, LOGIN, REGISTER } from '../constants/api';

// Tạo một instance Axios mới
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000, 
});

const whiteList = [LOGIN, REGISTER]

// Thêm interceptor để gắn bearer token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
        console.info('http', config);
      if (!whiteList.includes(config.url)){
        // Lấy bearer token từ AsyncStorage
        const token = await AsyncStorage.getItem('access');

        // Nếu tồn tại token, thêm nó vào header Authorization của yêu cầu
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      // Xử lý lỗi khi gặp lỗi trong quá trình lấy token từ AsyncStorage
      console.error('Error getting token from AsyncStorage:', error);
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi khi gặp lỗi trong quá trình gắn token
    return Promise.reject(error);
  }
);

export default axiosInstance;
