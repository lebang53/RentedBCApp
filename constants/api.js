export const API_BASE = 'https://8b94-2402-800-63a7-bd1a-15eb-e63d-fe11-22e4.ngrok-free.app'


//======================== AUTHENTICATION ========================

export const LOGIN = '/users/login/'
export const GET_TOKEN = '/users/get_token/'


//======================== USER ========================

export const REGISTER = '/users/'
export const CURRENT_USER = '/users/current-user/'
export const UPDATE_INFO = '/users/update_info/'
export const CHANGE_PASSWORD = '/users/change_password/'

//======================== CATEGORY ========================

export const CATEGORY = '/categories/'

//========================== POST ==============================
export const POST = '/posts/'
export const CREATE_POST = '/posts/create_post/'

//========================== HOUSE ===========================
 export const HOUSE = '/houses/'
 export const CREATE_HOUSE = '/houses/create_house/'

//========================= COMMENT ==========================
export const COMMENT = (postId) => `/posts/${postId}/get_comments/`;
export const POST_COMMENT = (postId) => `/posts/${postId}/comments/`
