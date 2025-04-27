import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("srujan@gmail.com");
  const [password, setPassword] = useState("Srujan@0610");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleLogin = (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password,
    };
    checkLoggedInUser(userCredentials);
  };

  const checkLoggedInUser = async (userCredentials) => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        userCredentials,
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data));
      toast.success("Login Successfull", {
        duration: 2000,
      });
      navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-[90%] md:w-1/3 py-8 rounded-md bg-white/50 shadow-xl relative">
        {/* <button
          data-tooltip-id="close-login-tooltip"
          data-tooltip-content={"Close"}
          className="hover:bg-[#9853a0] cursor-pointer bg-[#BF5CC9] w-6 h-6 rounded-full flex flex-col items-center justify-center absolute top-[-15px] right-[-15px]"
          onClick={() => {
            navigate("/");
          }}
        >
          <RxCross2 className="text-white" />
        </button>
        <ReactTooltip id="close-login-tooltip" /> */}
        <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
        <form className="px-8" onSubmit={onHandleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#a7a7a7] px-1.5 py-0.5 rounded-[3px]"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-[#a7a7a7] px-1.5 py-0.5 rounded-[3px]"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          {errorMessage && (
            <p className="text-red-700 text-sm mb-2">*{errorMessage}</p>
          )}
          <button className="bg-[#BF5CC9] rounded-[4px] text-white py-1.5  text-sm px-4 cursor-pointer hover:bg-[#9853a0]">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
