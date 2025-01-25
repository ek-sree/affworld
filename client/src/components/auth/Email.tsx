import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import { validateEmail } from "../../utils/validation";

const Email = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{email?:string}>({});

  const navigate = useNavigate()

  const handleSendOtp = async () => {
    const newError: { email?: string } = {};
    let validate =true
    if (!email.trim() || !validateEmail(email)) {
      newError.email = "Invalid email format";
      validate=false
    }
    setError(newError)
    if(!validate){
      return
    }
    setLoading(true);
    try {
      const verifyType:string = "forgotPassword"
      const response = await Axios.post(AUTH_ENDPOINTS.FORGOTPASS, { email,verifyType });
      
      if(response.status==200){
        localStorage.setItem("email", response.data.email);
        navigate('/otp')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Email or password incorrect"
          );
        }
      }
      console.log("Error occured verifying email in forgotpass ",error);
      setError({ email: "Error occurred, can't reset password" })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 px-4">
      <h1 className="text-3xl text-slate-300 font-semibold mb-6">
        Forgot Password
      </h1>
      <p className="text-slate-400 mb-4">
        Enter your email to receive an OTP and reset your password.
      </p>
      <div className="w-full max-w-sm">
      <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            error={error.email}
            icon={Mail}
            type="text"
            onToggleViewPass={null}
            showPasswordToggle={null}
            isPasswordVisible={undefined}
          />
        <button
          onClick={handleSendOtp}
          className={`w-full mt-4 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default Email;
