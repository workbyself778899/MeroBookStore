import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authActions } from "../src/store/auth";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        toast.error("Enter all details required !");
      } else {
        const response = await axios.post("https://shop-1-3t0g.onrender.com/api/v1/sign-in", Values);
        console.log(response.data.message);

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full md:w-3/6 lg:w-2/6 border border-gray-200">
        <h2 className="text-gray-800 text-2xl font-bold text-center">Login</h2>

        <div className="mt-6">
          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
              placeholder="Enter your username"
              name="username"
              value={Values.username}
              onChange={change}
              required
            />
          </div>

          <div className="mt-5">
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
              placeholder="Enter your password"
              name="password"
              value={Values.password}
              onChange={change}
              required
            />
          </div>

          <div className="mt-6">
            <button
              onClick={submit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
            >
              Log In
            </button>
          </div>

          <p className="flex mt-6 items-center justify-center text-gray-500 font-medium">
            Don’t have an account? &nbsp;
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
