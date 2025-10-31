import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        toast.error("Enter all details required !");
      } else {
        const response = await axios.post(
          "https://shop-1-3t0g.onrender.com/api/v1/sign-up",
          Values
        );

        toast.success(response.data.message);
        // navigate("/LogIn")
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-gray-100 px-6 py-10 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-gray-800 text-2xl font-bold text-center">Sign Up</p>
        <ToastContainer />
        <div className="mt-6">
          <div>
            <label className="text-gray-600">Username</label>
            <input
              type="text"
              className="w-full mt-2 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              name="username"
              value={Values.username}
              onChange={change}
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-2 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="xyz@gmail.com"
              name="email"
              value={Values.email}
              onChange={change}
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-2 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              name="password"
              value={Values.password}
              onChange={change}
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-600">Address</label>
            <textarea
              name="address"
              required
              placeholder="Address"
              rows="4"
              className="w-full mt-2 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={Values.address}
              onChange={change}
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>

          <p className="flex mt-6 items-center justify-center text-gray-500 font-medium">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
