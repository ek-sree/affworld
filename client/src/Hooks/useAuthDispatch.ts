import { useDispatch } from "react-redux";
import { saveAccessTokenToSession } from "../utils/tokenUtlis";
import { setUser } from "../redux/slices/userSlice";
import { IUser } from "../interface/IUser";

const useAuthDispatch = () => {
  const dispatch = useDispatch();

  const handleAuthSuccess = (data: { accessToken: string; user: IUser }) => {
    saveAccessTokenToSession(data.accessToken);
    dispatch(
      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      })
    );
  };

  return { handleAuthSuccess };
};

export default useAuthDispatch;
