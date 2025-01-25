import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import Axios from "../../api/axios/axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuthDispatch from "../../Hooks/useAuthDispatch";


const Otp = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('')

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const {handleAuthSuccess} = useAuthDispatch()
  const navigate = useNavigate();
  
useEffect(()=>{
  const userEmail = localStorage.getItem('email')
  if(userEmail){
    setEmail(userEmail)
  }
},[])

useEffect(() => {
  inputRef.current[0]?.focus();
}, []);

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
    }, 1000);
  }, [timer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentValue = e.target.value;
    if (/^[0-9]$/.test(currentValue)) {
      const newOtp = [...otp];
      newOtp[index] = currentValue;
      setOtp(newOtp);
      if (currentValue && index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    } else {
      e.target.value = "";
    }
  };
  
  
  const handleBackSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key == "ArrowLeft") {
      inputRef.current[index - 1]?.focus();
    }
    if (e.key == "ArrowRight") {
      inputRef.current[index + 1]?.focus();
    }
    if (e.key == "Backspace" && index > 0) {
      const currentInput = inputRef.current[index];
      if (currentInput?.value) {
        currentInput.value = "";
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join("");
      const response = await Axios.post(AUTH_ENDPOINTS.OTPVERIFY, {
        otp: otpValue,email
      });
      if(response.status==200){
        navigate('/newPassword')
      }
      if(response.status==201){
        localStorage.removeItem('email')
       handleAuthSuccess({
        accessToken:response.data.accessToken,
        user:response.data.data
       })
        navigate('/')
      }
     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.message || "Entered otp is wrong");
        } else {
          toast.error("An error occurred while logging in. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleResendOtp = async () => {    
    if (timer > 0) return; 
  
    setLoading(true);
    setError(""); 
    setOtp([])
    try {
      const response = await Axios.post(AUTH_ENDPOINTS.RESENDOTP, { email });
      if (response.status === 200) {
        toast.success("OTP resent successfully!");
        setTimer(60); 
      } else {
        setError("Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error occurred while resending OTP:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster position="top-center" expand={false} richColors />
      <div className="bg-gray-800 w-[27rem] p-8 rounded-xl">
        <h1 className="text-center font-bold text-white text-2xl mb-5 bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">
          AFFWORLD
        </h1>
        {email &&(
          <p className="text-sm mb-4 text-slate-400 justify-center flex">Otp send to <span className="font-bold pl-1">{email}</span></p>
        )}
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-between w-full max-w-xs gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="text"
                id="otp"
                ref={(el) => (inputRef.current[index] = el)}
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleBackSpace(e, index)}
                className="py-2 px-4 w-14 text-center rounded-xl border-2 border-slate-400 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
            {error && <div className="text-red-500">{error}</div>}
          {timer > 0 && (
            <span className="text-slate-300">Resend otp in {timer}</span>
          )}
          {timer > 0 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5 flex items-center justify-center gap-2 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Confirm"
              )}
            </button>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className={`py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5 flex items-center justify-center gap-2 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
