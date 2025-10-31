import { useEffect, useState } from "react";
import Sidebar from "../src/components/Profile/Sidebar";
import { useSelector } from "react-redux";
import Loader from "../src/components/Loader/Loader";
import axios from "axios";
import { Outlet } from "react-router-dom";
import MobileNav from "../src/components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-2 md:px-12 py-8 flex flex-col md:flex-row gap-6 text-gray-900">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : profile ? (
        <>
          {/* Sidebar + Mobile Nav */}
          <div className="w-full md:w-2/6 lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <Sidebar data={profile} />
            </div>
            <div className="block md:hidden mt-4">
              <MobileNav />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-4/6 lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center text-red-500 font-semibold">
          Failed to load profile ❌
        </div>
      )}
    </div>
  );
};

export default Profile;
