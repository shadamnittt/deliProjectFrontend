import { Routes, Route, Navigate } from "react-router-dom";
import AuthCard from "./components/WelcomeCard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SearchPage from "./pages/SearchPage";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";


<Routes>
  <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/register" element={<RegisterForm />} />
</Routes>

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthCard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home" element={<SearchPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
