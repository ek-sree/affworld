import { useState } from 'react';
import logo from '../../../public/images/logo.webp';
import user from '../../../public/images/user-icon.webp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import Axios from '../../api/axios/axios';
import { AUTH_ENDPOINTS } from '../../api/endpoints/authEndpoints';
import { clearUser } from '../../redux/slices/userSlice';
import { removeAccessTokenFromSession } from '../../utils/tokenUtlis';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
        setShowLogout(false);
    }, 1000);
  };

  const handleLogout=async()=>{
    try {
      const response = await Axios.post(AUTH_ENDPOINTS.LOGOUT)
      if(response.status==200){
        dispatch(clearUser())
        removeAccessTokenFromSession()
        navigate('/login')
      }
    } catch (error) {
      console.log("Error occured logOuting",error);
      toast.error("Error occured logouting,try later")
    }
  }

  const useName = useSelector((state:RootState)=>state.userAuth.name)

  return (
    <div className="bg-slate-500 min-h-20 flex justify-between items-center px-4 relative">
      <Toaster expand={false} richColors position='top-center'/>
      <div className="flex">
        <img src={logo} alt="logo" className="w-12 h-12 rounded-md" />
      </div>
{useName &&(<p>{useName}</p>)}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={user} alt="user-avatar" className="w-12 h-12 rounded-full cursor-pointer" />

        {showLogout && (
          <div className="absolute right-0 mt-2 bg-gray-200 text-black rounded shadow-lg">
            <button className="block px-4 py-2 w-full text-left hover:bg-neutral-400" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
