import "./profile.css";
import { useState } from "react";
import axios from "axios";

import { server_url } from "../config/url";

function ProfileConsumer() {
  const [obj, setobj] = useState({
    email: "",
    firstname: "",
    lastname: "",
    dealing: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    mobilenumber: "",
    aadhaarnumber: "",
    pic: null,
  });

  const [imgPrev, setPrev] = useState("");

  function doUpdate(event) {
    var { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  }

  function changepic(e) {
    setobj({ ...obj, [e.target.name]: e.target.files[0] });
    setPrev(URL.createObjectURL(e.target.files[0]));
  }

  function validateForm(obj) {
    const { email, firstname, lastname, mobilenumber, aadhaarnumber } = obj;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !firstname || !lastname || !obj.address || !obj.city || !obj.state || !obj.postalcode || !mobilenumber || !aadhaarnumber || !obj.pic) {
      alert("All fields are mandatory.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (firstname.trim().toLowerCase() === lastname.trim().toLowerCase()) {
      alert("First name and last name cannot be the same.");
      return false;
    }

    if (!/^\d{10}$/.test(mobilenumber)) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!/^\d{12}$/.test(aadhaarnumber)) {
      alert("Aadhaar number must be exactly 12 digits.");
      return false;
    }

    return true;
  }

  async function doSaveWithAxiosPost() {
    if (!validateForm(obj)) return;

    const url = server_url+"/save/saveprofileconsumer";
    var formdata = new FormData();

    for (var prop in obj) {
      formdata.append(prop, obj[prop]);
    }

    try {
      const serverMsg = await axios.post(url, formdata, { headers: { 'content-type': 'multipart/form-data' } });

      if (serverMsg.data.status === true) {
        alert("Saved successfully");
      } else {
        alert(serverMsg.data.msg + " " + serverMsg.data.err);
      }
    } catch (error) {
      alert("Error saving profile: " + error.message);
    }
  }

  async function fetchprofile() {
    const url = server_url+`/save/fetch-profile-consumer?email=${obj.email}`;
    const serverData = await axios.get(url);

    if (serverData.data.status === true) {
      if (serverData.data.obj != null) {
        alert(JSON.stringify(serverData));
        setobj(serverData.data.obj);
        setPrev(server_url+`/uploads/${serverData.data.obj.picpath}`);
      } else alert("User not Found");
    }
  }

  const updateprofile = async () => {
    if (!validateForm(obj)) return;

    const formData = new FormData();
    for (let key in obj) {
      formData.append(key, obj[key]);
    }

    try {
      const url = +server_url+"/save/update-profile-consumer";
      const response = await axios.post(url, formData, { headers: { 'Content-Type': "multipart/form-data" } });

      const data = response.data;

      if (data.success === true) {
        alert("Profile Updated Successfully");
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <form className="bg-white shadow-md rounded-xl p-12 m-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Create Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium text-gray-700">Email Address</label>
          <input type="email" name="email" onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div className="flex items-end">
          <button type="button" onClick={fetchprofile} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
            Search Profile
          </button>
        </div>

        <div>
          <label className="font-medium text-gray-700">First Name</label>
          <input type="text" name="firstname" value={obj.firstname} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">Last Name</label>
          <input type="text" name="lastname" value={obj.lastname} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div className="col-span-full">
          <label className="font-medium text-gray-700">Address</label>
          <input type="text" name="address" value={obj.address} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">City</label>
          <input type="text" name="city" value={obj.city} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">State</label>
          <input type="text" name="state" value={obj.state} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">Postal Code</label>
          <input type="text" name="postalcode" value={obj.postalcode} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">Mobile Number</label>
          <input type="text" name="mobilenumber" value={obj.mobilenumber} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div>
          <label className="font-medium text-gray-700">Aadhaar Number</label>
          <input type="text" name="aadhaarnumber" value={obj.aadhaarnumber} onChange={doUpdate} className="block w-full rounded-md border border-gray-400 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm" />
        </div>

        <div className="col-span-full">
          <label className="font-medium text-gray-700">Upload Aadhaar Pic</label>
          <div className="mt-2 flex items-center space-x-4">
            <input type="file" name="pic" onChange={changepic} className="file-input" />
            {imgPrev && <img src={imgPrev} alt="Preview" className="w-32 h-32 object-cover rounded-md border" />}
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-6 justify-start">
        <button type="button" onClick={doSaveWithAxiosPost} className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-500">
          Save Profile
        </button>
        <button type="button" onClick={updateprofile} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500">
          Update Profile
        </button>
      </div>
    </form>
  );
}

export default ProfileConsumer;