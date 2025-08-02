import React from 'react';
import "./dash.css";
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

function Dash() {
  let navigate = useNavigate();

  function openprofile() {
    navigate("/open_grower_profile");
  }

  function openavailitem() {
    navigate("/open_avail_item");
  }

  function openitemmang() {
    navigate("/open_item_manager");
  }

  function logout() { 
    navigate('/openmaindashboard');
  }

  return (
    <>
      {/* Top Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 h-16 flex justify-end items-center shadow-md px-4">
        <button
          type="button"
          className="rounded-md bg-indigo-800 w-24 h-10 text-sm font-semibold text-white shadow hover:bg-indigo-600 transition duration-200"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">Grower Dashboard</h1>

        <div className="flex flex-wrap justify-center gap-10">
          {/* Profile Card */}
          <Card
            className="w-72 h-96 transform transition duration-300 hover:scale-105 shadow-lg bg-white rounded-xl"
            imgSrc="pics/profile-grower.png"
          >
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={openprofile}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
              >
                Profile
              </button>
            </div>
          </Card>

          {/* Avail Item Card */}
          <Card
            className="w-72 h-96 transform transition duration-300 hover:scale-105 shadow-lg bg-white rounded-xl"
            imgSrc="pics/avail-items.png"
          >
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={openavailitem}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
              >
                Avail Item
              </button>
            </div>
          </Card>

          {/* Item Manager Card */}
          <Card
            className="w-72 h-96 transform transition duration-300 hover:scale-105 shadow-lg bg-white rounded-xl"
            imgSrc="pics/item-manager.gif"
          >
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={openitemmang}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
              >
                Item Manager
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dash;
