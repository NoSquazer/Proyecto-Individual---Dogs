import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home.jsx";
import LoginAndRegister from "./components/Login and Register/LoginAndRegister";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import LandingPage from "./components/LandingPage/LandingPage";
import Favorites from "./components/Favorites/Favorites";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const { accessToken, userId } = useSelector((state) => state);
  const { pathname } = useLocation();
  const isAuthenticated = !accessToken && !userId;

  return (
    <>
      <>{pathname !== "/" && pathname !== "/login&register" && <NavBar />}</>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {!isAuthenticated && (
          <>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/createDog" element={<Create />} />
          </>
        )}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login&register" element={<LoginAndRegister />} />
        <Route path="/:404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
