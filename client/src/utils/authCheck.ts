import axios from "axios";
import { isTokenExpired } from "./tokenExpireCheck";
import { REFRESH_ENDPOINTS } from "../api/endpoints/refreshEndpoints";
import { getAccessTokenFromSession, removeAccessTokenFromSession, saveAccessTokenToSession } from "./tokenUtlis";


export const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = getAccessTokenFromSession();

  if (accessToken && !isTokenExpired(accessToken)) {
    return true; 
  }

  try {
    const { data } = await axios.post(REFRESH_ENDPOINTS.REFRESH_TOKEN, {}, { withCredentials: true });
    const newAccessToken = data.accessToken;
    saveAccessTokenToSession(newAccessToken); 
    return true; 
  } catch (error) {
    console.error('Refresh token failed or expired:', error);
    removeAccessTokenFromSession();
    return false; 
  }
};
