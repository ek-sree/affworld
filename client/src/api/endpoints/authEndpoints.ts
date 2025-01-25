const BASE_URL = import.meta.env.VITE_API_URL;


export const AUTH_ENDPOINTS = {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    OTPVERIFY: `${BASE_URL}/auth/otpVerify`,
    RESENDOTP: `${BASE_URL}/auth/resendOtp`,
    GOOGLE_LOGIN: `${BASE_URL}/auth/google-login`,
    FORGOTPASS: `${BASE_URL}/auth/forgotPass`,
    RESETPASSWORD: `${BASE_URL}/auth/reset-password`,
    LOGOUT: `${BASE_URL}/auth/logout`
  };
  