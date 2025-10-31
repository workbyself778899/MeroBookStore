import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://shop-1-3t0g.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "https://shop-1-3t0g.onrender.com/api/v1/update-address",
        value,
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to update address");
    }
  };

  return (
    <>
      <ToastContainer />

      {!profileData ? (
        <div className="w-full flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen rounded-lg">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            ⚙️ Settings
          </h1>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <p className="p-3 rounded bg-white shadow mt-1 font-medium text-gray-800 border">
                {profileData.username}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="p-3 rounded bg-white shadow mt-1 font-medium text-gray-800 border">
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={value.address}
              rows="4"
              onChange={handleChange}
              className="p-3 w-full rounded bg-white shadow mt-1 font-medium text-gray-800 border resize-none focus:ring-2 focus:ring-orange-400 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded transition-all duration-300 shadow"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
