import React,{useState} from "react";
import axios from "axios";
import './buyitem.css';
import { server_url } from "../config/url";

export default function Findss(){

    const [obj,setObj]=useState({category:"", 
    product:"",
    selprod:"h",
    city:"",
    })

    //const [showFindGrowerPg,setFindGrowerPg]=useState(true);       //FindGrowerPg will hide on click of Search Grower Btn and Cards will be shown 
    const [product,setProduct]=useState([]);
    const [selprod,setSelProd]=useState("");
    const [city,setCity]=useState([]);
    const [showFindGrowerPg] = useState(true); // No setter


    function doUpdate(event){

        var{name,value}=event.target;

        setObj({...obj,[name]:value});

        //----Filling product Combo-box---

        var milkProduct=["milk","butter","panner","buttermilk","curd"]
        var vegProduct=["Carrots","Okra","Beans","Cabbage","Peas"];
        var fruitProduct=["Apple","Mango","Banana","Orange","Grapes"];
        var nutProduct=["Almond","Cashew","Walnut","Peanut","Pistachio"];
        var oilProduct=["Mustard","Sesame","Olive","Sunflower","Soyabean"];

        if(value==="Dairy Products"){
            setProduct(milkProduct)
        }
        else if(value==="Veggies"){
            setProduct(vegProduct)
        }
        else if(value==="Fruits"){
            setProduct(fruitProduct)
        }
        else if(value==="Nuts"){
            setProduct(nutProduct)
        }
        else{
            setProduct(oilProduct)
        }
    }

    function doUpdate2(event){
        
        setSelProd(event.target.value)
        setObj({...obj,"selprod":event.target.value})

        const selectedProduct = event.target.value;
        setSelProd(selectedProduct);
       setObj(prev => {
        const updatedObj = { ...prev, selprod: selectedProduct };
        return updatedObj;
        });
        setTimeout(() => doUpdateCity(), 0);

    }

   async function doUpdateCity() {
    try {
        const url = server_url+"/save/fetch-cities"; // Make sure this is your actual endpoint
        const { category, selprod } = obj;

        if (!category || !selprod) return;

        const res = await axios.post(url, { category, product: selprod });
        
        if (res.data && res.data.city) {
            setCity(res.data.city); // expects server to return { cities: [...] }
        } else {
            setCity([]);
        }
    } catch (error) {
        console.error("Error fetching cities:", error);
        setCity([]);
    }
}





    return(
    <>
        <div className="container">
            
                <center><p className="text-3xl/[70px] font-serif">Find Grower</p></center>
                {showFindGrowerPg ? 
                <div className="flex flex-row">
                <div className="basis-1/3 mr-8 ml-4">
                    <label htmlFor="category"  id="category" className="block mb-2 text-base font-serif font-medium text-gray-900 ">Product Category</label>
                    <select id="category" name="category" onChange={doUpdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500 w-40" placeholder="" required>
                        <option defaultValue={"Choose..."}>Choose..</option>            {/*Here onChange={doUpdate} val of category will be updated in obj state and relative products will be updated in prod combo*/}
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Veggies">Veggies</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Nuts">Nuts</option>
                        <option value="Edible Oil">Edible Oil</option>
                    </select>
                </div> 
                <div className="basis-1/3 mr-8">
                    <label htmlFor="product" className="block mb-2 text-base font-serif font-medium text-gray-900">Products</label>
                        <select name="product" id="product" onChange={doUpdate2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>    
                            <option defaultValue={"Choose"}>Choose..</option>           {/*Here onChange={doUpdate2} value of selprod will be updated in obj state as well as selprod state invoking useEffect and filling corresponding city combo*/}
                            {product.map((str,index)=>{
                                return <option key={index} value={str}>{str}</option>
                            })}
                        </select>
                </div>
                <div className="basis-1/3 mr-8">
                    <label htmlFor="city" className="block mb-2 text-base font-serif font-medium text-gray-900">city</label>
                        <select name="city" id="city" onChange={doUpdateCity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>    
                            <option defaultValue={"Choose"}>Choose..</option>          {/*Here onChange={doUpdate} only value of selected city will get updated in obj state*/}
                            {city.map((str,index)=>{
                                return <option key={index} value={str}>{str}</option>
                            })}
                        </select>
                </div>
                {/*<button type="button" onClick={doFindGrower} className="ml-[600px] mb-[30px] w-[150px] mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search&nbsp;Grower</button>*/ }
                </div> 
                
                : null }
                <p>Selected product: {selprod}</p>

               

             
        </div>

    </>    
        
    )
}