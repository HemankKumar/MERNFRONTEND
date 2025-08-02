import "./Login.css"
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { server_url } from '../config/url';
import axios from "axios";

function Login(){

    const [show, setShow] = useState(false);

     // password show and hide
     const handleSh=()=>{
        setShow(!show); 
      }

    const[userData,setData]=useState({
      emails:"",
      pass:""
    })

     //email validation
  const[email,setEmail]=useState("")
  const [message,setMessage]=useState(false)

  const emailValidation = (e)=>{
    var pattern=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/  ;
    var emailValue=e.target.value;

    var{name,value}=e.target;
    setData({...userData,[name]:value,})

    setEmail(emailValue)
    if(email.match(pattern)){
      setMessage(true);
    }
    else{
      setMessage(false);
    }
  }

    function doupdate(e){
      setData({...userData,[e.target.name]:e.target.value})
    }

    //Routing
    let navigate=useNavigate()

   async function doLogin(){
      const url = server_url+"/save/checklogin";

      const serverMsg=await axios.post(url,userData)
      console.log(serverMsg.data)
      
      if(serverMsg.data.status==true){

          if(serverMsg.data.user.acctype==="Consumer"){
          navigate("/openconsumerdashboard")
          }

          else{
            navigate("/opengrowerdashboard")
          }
    }
    else{
      alert("Email Id or Password are Incorrect")
    }
      
     
   }  
      
    
    

    return (
      <>
        <div  style={{ backgroundImage: "url(pics/loginbg.jpg)", backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center" }} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
            <img
              className="mx-auto h-40 w-40 "
              src="pics/login.png"
              alt="No pic"
            />
           
          </div>
  
          <div className=" input-field mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className=" font-serif block text-xl font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="emails"
                    type="email"
                    autoComplete="email"
                    
                    onChange={emailValidation}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className=" input-field flex items-center justify-between">
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
                <div className="mt-2">
                  <input
                    id="password"
                    name="pass"
                    type={show?"text":"password"}
                    autoComplete="current-password"
                    placeholder="Enter your Password"
                    onChange={doupdate}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <center>
                <button
                  type="button" onClick={doLogin}
                  className=" btn flex w-36 mt-8 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
                </center>
              </div>
            </form>
  
    
          </div>
        </div>
      </>
    )
  }
  

export default Login;  