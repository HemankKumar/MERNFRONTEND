import React, { useState } from "react";
import axios from "axios";
import { server_url } from "../config/url";


function ItemManager() {
  const [email, setEmail] = useState();
  const [ary, setAry] = useState([]);

  function doUpdate(event) {
    setEmail(event.target.value);
  }

  async function fetchdata() {
    const url = server_url+`/save/fetch-items?email=${email}`;
    const serverData = await axios.get(url);

    console.log(serverData.data);
    setAry(serverData.data.res);
    console.log(ary);

    if (serverData.data.status === 1) {
      if (serverData.data.res != null) {
        setAry(serverData.data.res);
      } else alert("Invalid Item or Check Case (upper/Lower)");
    }
    if (serverData.data.res === "") {
      alert("No data found");
    }
  }

  async function doDlt(object) {
    const url = server_url+"/save/delete-fetch-products";
    const serverMsg = await axios.post(url, object);

    alert(JSON.stringify(serverMsg.data));

    if (serverMsg.data.status === true) {
      alert("Deleted successfully!");
      fetchdata();
    } else {
      alert(serverMsg.data.msg + "  " + serverMsg.data.err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <form className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-sky-900 mb-10">
          Item Manager
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end border-b border-gray-300 pb-6">
          <div className="md:col-span-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={doUpdate}
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={fetchdata}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-md shadow"
            >
              Items Published
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-10">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-sky-100 text-gray-900">
              <tr>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Category</th>
                <th className="py-3 px-6 text-center">Items</th>
                <th className="py-3 px-6 text-center">City</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ary.map((obj, index) => (
                <tr key={index} className="hover:bg-sky-50">
                  <td className="py-4 px-6 text-center">
                    <img
                      src={server_url+`/uploads/${obj.picpath}`}
                      alt="item"
                      className="mx-auto h-24 w-36 object-cover rounded shadow"
                    />
                  </td>
                  <td className="py-4 px-6 text-center text-blue-950 text-lg">
                    {obj.category}
                  </td>
                  <td className="py-4 px-6 text-center text-blue-950 text-lg">
                    {obj.items}
                  </td>
                  <td className="py-4 px-6 text-center text-blue-950 text-lg">
                    {obj.city}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        doDlt(obj);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ItemManager;
