import React, { useState } from 'react'
import axios from "axios";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { server_url } from '../config/url';

export default function AvailItems() {
  const [obj, setobj] = useState({
    email: "",
    category: "",
    items: [],
    city:"",
    pic: null
  })

  const [imgPrev , setPrev] = useState("");
  const [category,setcategory]=useState([]);
  const [selprod,setSelProd]=useState("");

  function changepic(e) {
    setobj({ ...obj, [e.target.name]:e.target.files[0] })
    setPrev(URL.createObjectURL(e.target.files[0]))
  }

  function doUpdate(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value })

    const milkProduct = ["milk","butter","panner","buttermilk","curd"]
    const vegProduct = ["Carrots","Okra","Beans","Cabbage","Peas"]
    const fruitProduct = ["Apple","Mango","Banana","Orange","Grapes"]
    const nutProduct = ["Almond","Cashew","Walnut","Peanut","Pistachio"]
    const oilProduct = ["Mustard","Sesame","Olive","Sunflower","Soyabean"]

    if(value === "Dairy Products") setcategory(milkProduct)
    else if(value === "Veggies") setcategory(vegProduct)
    else if(value === "Fruits") setcategory(fruitProduct)
    else if(value === "Nuts") setcategory(nutProduct)
    else setcategory(oilProduct)
  }

  function doUpdate2(event){
    const options = [...event.target.selectedOptions];
    options.forEach(opt => {
      if(!obj.items.includes(opt.value)) obj.items.push(opt.value)
    });
  }

  async function doSaveWithAxios() {
    const url = server_url+"/save/save-avail-product";
    const formdata = new FormData();
    for (let prop in obj) formdata.append(prop, obj[prop]);

    const serverMsg = await axios.post(url, formdata, {
      headers: { 'content-type': 'multipart/form-data' }
    });

    if (serverMsg.data.status === true) alert("Product saved successfully")
    else alert(serverMsg.data.msg + " " + serverMsg.data.err)
  }

  return (
    <div className="flex justify-center items-start py-10 px-4 bg-gradient-to-r from-sky-100 via-white to-green-100 min-h-screen">
      <div className='hidden lg:flex flex-col items-center mr-12 gap-12'>
        <img className="h-74 w-80 object-cover rounded shadow-md" src="pics/giphy.gif" alt="" />
        <img className="h-74 w-80 object-cover rounded shadow-md" src="pics/giph.gif" alt="" />
        
      </div>

      <form className="bg-white shadow-lg rounded-xl p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-sky-800 mb-6">Enlist Your Items</h1>
        <p className="text-sm text-gray-600 mb-8">Please provide your contact info and products you want to enlist.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={doUpdate}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              onChange={doUpdate}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Category</label>
            <select
              name="category"
              onChange={doUpdate}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            >
              <option>Choose..</option>
              <option value="Dairy Products">Dairy Products</option>
              <option value="Veggies">Veggies</option>
              <option value="Fruits">Fruits</option>
              <option value="Nuts">Nuts</option>
              <option value="Edible Oil">Edible Oil</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Items (Ctrl+Click to Select Multiple)</label>
            <select
              multiple
              name="product"
              onChange={doUpdate2}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-sky-500"
            >
              <option>Choose..</option>
              {category.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Product Image</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-md">
            <PhotoIcon className="h-10 w-10 text-gray-400 mb-2" aria-hidden="true" />
            <label className="cursor-pointer text-sky-600 font-semibold hover:underline">
              Upload a file
              <input type="file" name="pic" onChange={changepic} className="hidden" />
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {imgPrev && (
          <div className="mt-4">
            <img src={imgPrev} alt="Preview" className="h-40 w-auto rounded-md shadow" />
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={doSaveWithAxios}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  )
}
