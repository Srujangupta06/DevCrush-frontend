import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import { Toaster } from "react-hot-toast";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/Request";
import SignUp from "./components/SignUp";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp/>} />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Hero />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<ConnectionRequests />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
