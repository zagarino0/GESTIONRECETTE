import React, { useEffect, useState } from"react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoadingPage from "./pages/loadingPage/loadingPage";
import LoginPage from "./pages/login/login";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);
  return (
    <>
    <Router>
      <Routes>
      { isLoading ? (<Route path="/loading" element={<LoadingPage />}></Route> ):( <Route path="/" element={<LoginPage />}></Route>) }        
      </Routes>
    </Router>
    </>
  );
}

export default App;
