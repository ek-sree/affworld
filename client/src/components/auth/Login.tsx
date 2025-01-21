import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import sideimg from "../../../public/images/88fc954a0a6166e92422cddf58c482c6.webp";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { toast, Toaster } from "sonner";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import InputField from "../common/InputField";
import GoogleButton from "../common/GoogleButton";
import useAuthDispatch from "../../Hooks/useAuthDispatch";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPass, setViewPass] = useState<boolean>(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});


  const { handleAuthSuccess }= useAuthDispatch()
  const navigate = useNavigate();

  const handleViewPass = () => {
    setViewPass((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let validate = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      validate = false;
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character";
      validate = false;
    }

    setError(newErrors);

    if (!validate) {
      return;
    }
    setLoading(true);
    try {
      const response = await Axios.post(AUTH_ENDPOINTS.LOGIN, {email,password});
      if (response.status == 200) {
        handleAuthSuccess({
          accessToken:response.data.accessToken,
          user:response.data.data
        })
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(
            error.response.data.message || "Email or password incorrect"
          );
        } else if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Invalid email or password"
          );
        } else {
          toast.error("An error occurred while signing up. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex justify-center items-center">
        <Toaster expand={false} richColors position="top-center" />
        <img
          src={sideimg}
          alt="side-image"
          className="ml-16 w-[40rem] h-[40rem] object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center px-8">
        <h1 className="text-4xl text-slate-300 font-semibold mb-6">
          Welcome back
        </h1>
        <h2 className="text-lg text-slate-400 font-thin mb-6">
          Enter your credentials to Login
        </h2>

        <form className="w-full max-w-sm space-y-6">
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

          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            error={error.password}
            icon={Lock}
            type={viewPass ? "text" : "password"}
            onToggleViewPass={handleViewPass}
            showPasswordToggle={password}
            isPasswordVisible={viewPass}
          />

          <div>
            <p className="text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </div>

          <div className="relative flex justify-center items-center">
            <button
              type="submit"
              className="w-full border-2 border-blue-500 hover:border hover:bg-blue-700 text-white py-2 rounded font-semibold transition flex items-center justify-center"
              onClick={handleLogin}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 text-white" />
                </>
              )}
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <GoogleButton/>
          </div>

          <div className="flex justify-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
