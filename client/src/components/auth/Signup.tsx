import { ArrowRight,CaseSensitive,  Loader2, Lock, Mail,} from "lucide-react";
import sideimg from "../../../public/images/88fc954a0a6166e92422cddf58c482c6.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { validateEmail, validatePassword } from "../../utils/validation";
import { toast, Toaster } from "sonner";
import InputField from "../common/InputField";
import GoogleButton from "../common/GoogleButton";

const Signup = () => {
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [viewPass, setViewPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{name?: string;email?: string;password?: string;}>({});

  const navigate = useNavigate();

  const handleViewPass = () => {
    setViewPass((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validate = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (name.trim().length <= 2) {
      newErrors.name = "Name must be greater than 2 characters";
      validate = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      validate = false;
    }

    if (!validatePassword(password)) {
      newErrors.password ="Password must be at least 8 characters long, contain at least one letter, one number, and one special character";
      validate = false;
    }

    setError(newErrors);

    if (!validate) {
      return;
    }
    setLoading(true);
    try {
      const response = await Axios.post(AUTH_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
      });
      if (response.status == 200) {
        console.log(response);

        localStorage.setItem("email", response.data.email);
        navigate("/otp");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Email or password incorrect"
          );
        } else if (error.response.status === 409) {
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
      <div className="flex flex-col justify-center items-center px-8">
        <Toaster position="top-center" expand={false} richColors />
        <h1 className="text-4xl text-slate-300 font-semibold mb-6">Welcome</h1>
        <h2 className="text-lg text-slate-400 font-thin mb-6">
          Fill credentials to Signup
        </h2>
        <form className="w-full max-w-sm space-y-6">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            error={error.name}
            icon={CaseSensitive}
            type="text"
            onToggleViewPass={null}
            showPasswordToggle={null}
            isPasswordVisible={undefined}
          />

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

          <div className="relative flex justify-center items-center">
            <button
              type="submit"
              className="w-full border-2 border-blue-500 hover:border hover:bg-blue-700 text-white py-2 rounded font-semibold transition flex items-center justify-center"
              onClick={handleSubmit}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Signup
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="hidden md:flex justify-center items-center">
        <img
          src={sideimg}
          alt="side-image"
          className="ml-16 w-[40rem] h-[40rem] object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
