// src/App.js

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth"; // Импортируем AuthProvider
import WelcomeCard from "./components/WelcomeCard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
