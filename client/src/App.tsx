import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import UserRouter from './Router/UserRoute'

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
     <GoogleOAuthProvider clientId={clientId}>
     <UserRouter/>
     </GoogleOAuthProvider>
    </>
  )
}

export default App
