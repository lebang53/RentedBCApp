export const API_BASE = 'https://d65f-116-98-255-73.ngrok-free.app'


//======================== AUTHENTICATION ========================

export const LOGIN = '/users/login/'
export const GET_TOKEN = '/users/get_token/'


//======================== USER ========================

export const REGISTER = '/users/'
export const CURRENT_USER = '/users/current-user/'
export const UPDATE_INFO = '/users/update_info/'


//======================== CATEGORY ========================

export const CATEGORY = '/categories/'

//========================== POST ==============================
export const POST = '/posts/'
export const CREATE_POST = '/posts/create_post/'

//========================== HOUSE ===========================
 export const HOUSE = '/houses/'

//========================= COMMENT ==========================
export const COMMENT = (postId) => `/posts/${postId}/get_comments/`;
