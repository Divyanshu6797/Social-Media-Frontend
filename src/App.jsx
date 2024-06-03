import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserSignUp from "./pages/user/UserSignUp";
import UserLogin from "./pages/user/UserLogin";
import UserHomepage from "./pages/user/UserHomepage";
import MyProfilePage from "./pages/user/MyProfilePage";
import NavbarAll from "./components/miscellaneous/NavbarAll";

import PrivateRoute from "./Routing/PrivateRoute";
import PublicRoute from "./Routing/PublicRoute";
import FollowersPage from "./pages/followers/FollowersPage";
// import MyChatPage from "./pages/user/MyChatPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarAll />
        <div>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<UserLogin />} />
              <Route path="/user/signup" element={<UserSignUp />} />
              <Route path="/user/login" element={<UserLogin />} />
              

            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/user/homepage" element={<UserHomepage />} />
              <Route path="/user/myprofile" element={<MyProfilePage />} />
              <Route path="/user/followers" element={<FollowersPage/>} />
            </Route>
           
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
