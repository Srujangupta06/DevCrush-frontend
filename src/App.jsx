import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import { Toaster } from "react-hot-toast";
import EditProfile from "./components/EditProfile";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Hero />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
