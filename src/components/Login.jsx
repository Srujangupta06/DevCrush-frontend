import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        "http://localhost:8000/auth/login",
        userCredentials,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-[90%] md:w-1/3 py-8 rounded-md bg-white/50 shadow-xl">
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-[#BF5CC9] rounded-[4px] text-white py-1.5  text-sm px-4 cursor-pointer hover:bg-[#9853a0]">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
