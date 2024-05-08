export const API_BASE = 'https://09f7-125-235-238-46.ngrok-free.app'


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
export const POST_COMMENT = (postId) => `/posts/${postId}/comments/`
