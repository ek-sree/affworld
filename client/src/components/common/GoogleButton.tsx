import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { useNavigate } from "react-router-dom";
import useAuthDispatch from "../../Hooks/useAuthDispatch";
import { AxiosError } from "axios";


const GoogleButton: React.FC = () => {
  const { handleAuthSuccess } = useAuthDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (response: CredentialResponse) => {
    if (response.credential) {
      const token = response.credential;

      try {
        const res = await Axios.post(AUTH_ENDPOINTS.GOOGLE_LOGIN, { token });

        if (res.status === 201 || res.status==200) {
          handleAuthSuccess({
            accessToken: res.data.accessToken,
            user: res.data.data,
          });
          navigate("/");
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          toast.error(
            axiosError.response.data.message ||
              "An error occurred while logging in with Google."
          );
        } else {
          toast.error("Network error. Please check your connection.");
        }
      }
    } else {
      toast.error("Credential is missing in the Google response.");
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Error occurred while signing in with Google!");
  };

  return (
    <div className="w-full flex items-center justify-center bg-white text-gray-800 py-1 rounded font-semibold shadow-md hover:shadow-lg transition">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleLoginFailure}
        useOneTap
        size="large"
      />
    </div>
  );
};

export default GoogleButton;
