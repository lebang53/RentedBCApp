
import { jwtDecode } from 'jwt-decode';

export const checkExpireToken = (token) => {
    try {
        console.log('Decoded token:', token);
        const decodedToken = jwtDecode(token, {header: true});
      
        // Kiểm tra thời gian hết hạn
        if (decodedToken.exp) {
          const currentTimestamp = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTimestamp) {
            return true;
          } else {
            return false;
          }
        }
      } catch (error) {
        console.log('Invalid token:', error.message);
        return true;
      }
}