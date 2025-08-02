//grower profile form


import { useState } from "react";

import axios from "axios";

import { PhotoIcon } from '@heroicons/react/24/solid'
import { server_url } from "../config/url";

function Profile() {

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
    pic: null
  })

  const [imgPrev , setPrev] = useState("");

  function doUpdate(event) {
    var { name, value } = event.target;
    setobj({ ...obj, [name]: value, })
  }

  function changepic(e) {
    setobj({ ...obj, [e.target.name]:e.target.files[0] })
    setPrev(URL.createObjectURL(e.target.files[0]))
  }

  function validateForm() {
    const { email, firstname, lastname, dealing, address, city, state, postalcode, mobilenumber, aadhaarnumber, pic } = obj;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const aadhaarRegex = /^\d{12}$/;

    if (!email || !firstname || !lastname || !dealing || !address || !city || !state || !postalcode || !mobilenumber || !aadhaarnumber || !pic) {
      alert("All fields are mandatory.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (firstname.trim().toLowerCase() === lastname.trim().toLowerCase()) {
      alert("First name and Last name should not be the same.");
      return false;
    }

    if (!mobileRegex.test(mobilenumber)) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!aadhaarRegex.test(aadhaarnumber)) {
      alert("Aadhaar number must be exactly 12 digits.");
      return false;
    }

    return true;
  }

  async function doSaveWithAxiosPost() {
    if (!validateForm()) return;

    const url = server_url+"/save/saveprofile";
    var formdata = new FormData();

    for (var prop in obj) {
      formdata.append(prop, obj[prop]);
    }

    const serverMsg = await axios.post(url, formdata, {
      headers: { 'content-type': 'multipart/form-data' }
    });

    if (serverMsg.data.status === true) {
      alert("Saved successfully");
    } else {
      alert(serverMsg.data.msg + " " + serverMsg.data.err);
    }
  }

  async function fetchprofile() {
    const url = server_url+`/save/fetch-profile?email=${obj.email}`;
    const serverData = await axios.get(url);

    if(serverData.data.status==true) {
      if(serverData.data.obj!=null) {
        alert(JSON.stringify(serverData));
        setobj(serverData.data.obj);
        setPrev(server_url+`/uploads/${serverData.data.obj.picpath}`);
      } else {
        alert("Invalid Item or Check Case (upper/Lower)");
      }
    }
  }

  const updateprofile = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    for (let key in obj) {
      formData.append(key, obj[key]);
    }

    const url = server_url+"/save/update-profile";
    const response = await axios.post(url, formData, {
      headers: { 'Content-Type': "multipart/form-data" }
    });

    const data = await response.data;
    if (data.success === true) {
      alert("Profile Updated Successfully");
    } else {
      alert("Something went wrong: " + data.error);
    }
  };

  return (
    <form className="bg-white shadow-xl rounded-3xl p-10 m-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">Create Your Profile, Grower 🌱</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full sm:col-span-2">
          <label className="text-gray-700 font-medium">Email Address</label>
          <input type="email" name="email" onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex items-end">
  <button
    type="button"
    onClick={fetchprofile}
    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Search Profile
  </button>
</div>

        <div>
          <label className="text-gray-700 font-medium">First Name</label>
          <input type="text" name="firstname" value={obj.firstname} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Last Name</label>
          <input type="text" name="lastname" value={obj.lastname} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Dealing In</label>
          <select name="dealing" value={obj.dealing} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="" disabled>Select</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy Products</option>
          </select>
        </div>

        <div className="col-span-full">
          <label className="text-gray-700 font-medium">Address</label>
          <input type="text" name="address" value={obj.address} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">City</label>
          <input type="text" name="city" value={obj.city} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">State</label>
          <input type="text" name="state" value={obj.state} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Postal Code</label>
          <input type="text" name="postalcode" value={obj.postalcode} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Mobile Number</label>
          <input type="text" name="mobilenumber" value={obj.mobilenumber} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Aadhaar Number</label>
          <input type="text" name="aadhaarnumber" value={obj.aadhaarnumber} onChange={doUpdate} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="col-span-full">
          <label className="text-gray-700 font-medium">Upload Aadhaar Pic</label>
          <div className="flex items-center space-x-4 mt-2">
            <input type="file" name="pic" onChange={changepic} className="input-file" />
            {imgPrev && <img src={imgPrev} alt="preview" className="h-24 rounded-lg shadow-md" />}
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-6 justify-start">
        <button
    type="button"
    onClick={doSaveWithAxiosPost}
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    Save Profile
  </button>

  <button
    type="button"
    onClick={updateprofile}
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Update Profile
  </button>
      </div>
    </form>
  )
}

export default Profile;
