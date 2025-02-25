import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HRDetectiveMainMenu from "./components/MainMenu";
import GameBoard from "./components/GameBoard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthProvider, useAuth } from "./components/context/AuthContext";

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const auth = useAuth();
  
  if (auth.loading) return <div className="loading">Loading...</div>;
  
  return auth.isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute element={<HRDetectiveMainMenu />} />} />
      <Route path="/game-board" element={<PrivateRoute element={<GameBoard />} />} />
      <Route
        path="/case-library"
        element={<PrivateRoute element={<div>Case Library (Coming Soon)</div>} />}
      />
      <Route
        path="/my-verdicts"
        element={<PrivateRoute element={<div>My Verdicts (Coming Soon)</div>} />}
      />
      <Route 
        path="/training" 
        element={<PrivateRoute element={<div>Training (Coming Soon)</div>} />} 
      />
      <Route 
        path="/settings" 
        element={<PrivateRoute element={<div>Settings (Coming Soon)</div>} />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;