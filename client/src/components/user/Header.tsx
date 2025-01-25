import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,  NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store/store';
import { clearUser } from '../../redux/slices/userSlice';
import { removeAccessTokenFromSession } from '../../utils/tokenUtlis';
import Axios from '../../api/axios/axios';
import { AUTH_ENDPOINTS } from '../../api/endpoints/authEndpoints';
import { Toaster } from 'sonner';
import {  ListTodo, FileText } from 'lucide-react';

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.userAuth.name);

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowLogout(false);
    }, 2000);
  };

  const handleLogout = async () => {
    try {
      const response = await Axios.post(AUTH_ENDPOINTS.LOGOUT);
      if (response.status === 200) {
        dispatch(clearUser());
        removeAccessTokenFromSession();
        navigate('/login');
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800">
      <Toaster expand={false} richColors position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="logo"
              className="ml-3 w-10 h-10 rounded-md border-2 border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-8">
          <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) => 
            `flex items-center space-x-2 ${
              isActive 
                ? 'text-blue-500 font-bold' 
                : 'text-slate-300 hover:text-blue-500'
            } transition-colors`
          }
        >
              <ListTodo className="w-5 h-5" />
              <span className="font-medium">Tasks</span>
            </NavLink>
            <NavLink
          to="/post"
          className={({ isActive }: { isActive: boolean }) => 
            `flex items-center space-x-2 ${
              isActive 
                ? 'text-blue-500 font-bold' 
                : 'text-slate-300 hover:text-blue-500'
            } transition-colors`
          }
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Posts</span>
        </NavLink>
          </div>

          <div className="flex items-center relative">
            <img
              src="/images/user-icon.webp"
              alt="user-avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {showLogout && (
              <div
                className="absolute right-0 top-12 mt-1 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-slate-300 border-b border-slate-700">
                    Signed in as <span className="font-medium">{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;