const BASE_URL = process.env.REACT_APP_BASE_URL
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// POSTER ENDPOINTS
export const posterEndpoints = {
  GET_ALL_POSTER_API: BASE_URL + "/poster/getAllPoster",
  POSTER_DETAILS_API: BASE_URL + "/poster/getPosterDetails",
  GET_MULTIPLE_POSTER_API: BASE_URL + "/poster/getMultiplePosterDetails",
  GET_ORDER_HISTORY: BASE_URL + "/poster/getOrderHistory",
}

// PAYMENTS ENDPOINTS
export const paymentEndpoints = {
  POSTER_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  POSTER_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}