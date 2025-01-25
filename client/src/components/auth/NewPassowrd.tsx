import React, { useEffect, useState } from "react";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import { validatePassword } from "../../utils/validation";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";

const NewPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [viewPass, setViewPass] = useState<boolean>(false);
  const [viewConfirmPass, setViewConfirmPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ password?: string; confirmPassword?: string }>({});
  const [email, setEmail] = useState<string>('')

  const navigate = useNavigate();

  const handleViewPass = () => {
    setViewPass((prev) => !prev);
  };

  const handleViewConfirmPass = () => {
    setViewConfirmPass((prev) => !prev);
  };

  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    let validate = true;
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character";

      validate = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      validate = false;
    }

    setError(newErrors);

    if (!validate) {
        return;
    }

    setLoading(true);
    try {
        const response = await Axios.post(AUTH_ENDPOINTS.RESETPASSWORD,{password,email})
        if(response.status==200){
            localStorage.removeItem('email')
            navigate('/login')
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    setError({})       
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
const userEmail = localStorage.getItem('email')
if(userEmail){
    setEmail(userEmail)
}
  },[])

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center">
      <Toaster expand={false} richColors position="top-center" />
      <div className="max-w-md w-full p-8 bg-slate-700 rounded-lg shadow-md">
        <h1 className="text-3xl text-slate-300 font-semibold mb-6 text-center">Set New Password</h1>
        <form className="space-y-6" onSubmit={handleNewPassword}>
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            error={error.password}
            icon={Lock}
            type={viewPass ? "text" : "password"}
            onToggleViewPass={handleViewPass}
            showPasswordToggle={password}
            isPasswordVisible={viewPass}
          />

          <InputField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            error={error.confirmPassword}
            icon={Lock}
            type={viewConfirmPass ? "text" : "password"}
            onToggleViewPass={handleViewConfirmPass}
            showPasswordToggle={confirmPassword}
            isPasswordVisible={viewConfirmPass}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded font-semibold transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Submit
                <ArrowRight className="ml-2 text-white" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
