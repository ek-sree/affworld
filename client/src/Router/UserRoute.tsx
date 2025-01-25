import { Route, Routes } from "react-router-dom"
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"
import Otp from "../components/auth/Otp"
import LandingPage from "../pages/user/LandingPage"
import { PublicRoute } from "../utils/routes/PublicRoute"
import { UserPrivateRoute } from "../utils/routes/UserPrivateRoutes"
import PostPage from "../pages/user/PostPage"
import Email from "../components/auth/Email"
import NewPassword from "../components/auth/NewPassowrd"


const UserRouter = () => {
 
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/email" element={<Email/>}/>
        <Route path="/newPassword" element={<NewPassword/>}/>
      </Route>

      <Route element={<UserPrivateRoute/>}>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/post" element={<PostPage/>}/>
      </Route>
    </Routes>
  )
}

export default UserRouter