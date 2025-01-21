import { Route, Routes } from "react-router-dom"
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"
import Otp from "../components/auth/Otp"
import LandingPage from "../pages/user/LandingPage"
import { PublicRoute } from "../utils/routes/PublicRoute"
import { UserPrivateRoute } from "../utils/routes/UserPrivateRoutes"


const UserRouter = () => {
 

  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<Otp/>}/>
      </Route>

      <Route element={<UserPrivateRoute/>}>
        <Route path="/" element={<LandingPage/>}/>
      </Route>
    </Routes>
  )
}

export default UserRouter