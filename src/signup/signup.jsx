import "./signup.css"
import {useState} from "react";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { server_url } from "../config/url";

function Signup() {

  const[obj,setobj]=useState(
    {
      emails:"",
      pass:"",
      cpass:"",
      acctype:""

    }
  )

  //email validation
  const[email,setEmail]=useState("")
  const [message,setMessage]=useState(false)

  const emailValidation = (e)=>{
    var pattern=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/  ;
    var emailValue=e.target.value;

    var{name,value}=e.target;
    setobj({...obj,[name]:value,})

    setEmail(emailValue)
    if(email.match(pattern)){
      setMessage(true);
    }
    else{
      setMessage(false);
    }
  }


//password validation
const [show, setShow] = useState(false);
const [password, setPassword] = useState("");
const [isValid, setIsValid] = useState(false);
const handlePassword = (e) => {
    const pass = e.target.value;

    var{name,value}=e.target;
    setobj({...obj,[name]:value,})

    setPassword(pass);
    const lengthRegex = /^.{8,}$/; // At least 8 characters long
    const digitRegex = /\d/; // At least one digit
    const specialCharRegex = /[!@#$%^&]+/; // At least one special character
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    
    const isValidLength = lengthRegex.test(pass);
    const hasDigit = digitRegex.test(pass);
    const hasSpecialChar = specialCharRegex.test(pass);
    const hasLowercase = lowercaseRegex.test(pass);

    setIsValid(isValidLength && hasDigit && hasSpecialChar && hasLowercase);
};
    // password show and hide
    const handleSh=()=>{
      setShow(!show); 
    }


      // confirm password   
  const[cpass,setCPas]=useState("");
  const checkCp=(e)=>{

    var{name,value}=e.target;
    setobj({...obj,[name]:value,})

    var c=e.target.value;
    setCPas(c);
    if(c===password){
      setCPas(true)
    }
    else{
      setCPas(false)
    }
    
 
  }


  function doupdate(e){
    var{name,value}=e.target;
    setobj({...obj,[name]:value,})
  }

  async function save_with_axios_post(){
    const url = server_url+"/save/savesignup";
    
    const serverMsg= await axios.post(url,obj);
   
    if(serverMsg.data.status===true)
        alert("Saved Successfullyyyyy");
    else    
        alert(serverMsg.data.msg+"  "+serverMsg.data.err);
}


    return (
      <>
        <div  style={{ backgroundImage: "url(pics/bg.jpeg)", backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center" }} className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-100 ">
          <div className=" psignup sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className=" signup mx-auto mt-[-70px] h-10 w-30 "
              src="pics/sign-up-form.svg"
              alt="No pic"
            />
            <h2  className=" text text-center text-5xl mt-[-20px] font-bold leading-9 tracking-tight ">
              Signup
            </h2>
          </div>
  
          <div className="input-field mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className=" font-serif block text-xl font-medium leading-6 text-gray-900 ">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="emails"
                    type="email"
                    autoComplete="email"
                    
                    onChange={emailValidation}
                    value={email}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className={email.length==0?"icon fill-color":message?"icon check-color":"icon error-color"} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                </div>

                <p className={email.length==0?"text-message fill-color":message?"text-message success-color":"text-message error-color"}>{email.length==0?"Please fill in the email field": message?"Email Valid":"Invalid Email" }</p>

              </div>
  

                <div>
                    <div className="input-field flex items-center justify-between">
                      <label htmlFor="password" className=" font-serif block text-xl font-medium leading-6 text-gray-900">
                          Password
                      </label>

                      <div className="eye text-base mr-3 cursor-pointer"> 

                        {
                        show?(<FontAwesomeIcon onClick={handleSh} icon={faEye} id="show_hide" />)
                        :(<FontAwesomeIcon onClick={handleSh} icon={faEyeSlash} id="show_hide"/>)
                        } 

                      </div>

                    </div>

                    <div className="mt-1">
                      <input
                          id="password"
                          name="pass"
                          type={show?"text":"password"}
                          autoComplete="current-password"
                          placeholder="Password must be more than 8 character long"
                          onChange={handlePassword}
                          required
                          className="block w-full rounded-md border-0 py-1.5 px-2 h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <p className={password.length==0?"pass-message fill-color":password?"pass-message success-color":"pass-message error-color"}>{password.length==0?"Must Use a Spl.Char,Digit and Alphabet": password.length>8?"Password Valid":"Invalid Password" }</p>

                </div>



                 <div>

                    <div className="input-field flex items-center justify-between">
                    <label htmlFor="password" className=" font-serif block text-xl font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>

                    <div className="eye text-base mr-3 cursor-pointer"> 

                        {
                        show?(<FontAwesomeIcon onClick={handleSh} icon={faEye} id="show_hide" />)
                        :(<FontAwesomeIcon onClick={handleSh} icon={faEyeSlash} id="show_hide"/>)
                        } 

                    </div>
                    </div>

                    <div className="mt-1">
                    <input
                        id="cpassword"
                        name="cpass"
                        type={show?"text":"password"}
                        autoComplete="current-password"
                        placeholder="Enter Your Password Again"
                        onChange={checkCp}
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>

                    <p className={cpass?"cpass-message success-color":"cpass-message error-color"}>{cpass.length==0?" ":cpass?"Password Match😃":"Password do not match" }</p>

                  </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="category" className=" font-serif block text-xl font-medium leading-6 text-gray-900">
                        Select Type
                    </label>
                    </div>

                    <div className="mt-1">
                <select
                  id="category"
                  name="acctype"
                  autoComplete="country-name"
                  onChange={doupdate}
                  className="block w-full rounded-md h-[40px] pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value="" disabled selected hidden>Choose type of Account</option>
                  <option className="text-base h-[30px]">Seller</option>
                  <option className="text-base h-[30px]">Consumer</option>
                </select>
                </div>

                </div>
  
                <div>
                    <center>               
                        <button
                        type="button"
                        onClick={save_with_axios_post}
                        className=" btn flex w-36 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 "
                        >
                        Sign in
                        </button>
                    </center>
                </div>


            </form>
          </div>
        </div>
      </>
    )
  }
  

export default Signup;  