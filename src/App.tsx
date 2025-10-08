import './App.css'
import './common.css'
import ForgotPassword from './features/auth/forgot_password'
import Login from './features/auth/login'
import SignUp from './features/auth/signup'
import Dashboard from './features/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/forgot-password/:id" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
