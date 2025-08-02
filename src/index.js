import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

//import Login from './Login/Login';

//import Signup from './signup/signup';

import { App } from './App'; 

//=========================================Consumer===============================================================================================
//import Find from './buy_products/products';

//import Dashconsumer from './Dashboard_Consumer/dashs';

//import Profileconsumer from './Profie_form-consumer/profile';



//==============================================Grower=============================================================================================
// import ItemManager from './item_manager/items';

//import Profile from './Profile_Form/profile';


//import AvailItems from './Avail_Products/AvailItems';

// import Profile from './Profile_Form/profile';

//import Dash from './Dashboard_Grower/dash';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>

    
    
    <App></App>

    

    {/* <Signup></Signup> */}

    {/* <Login></Login> */}



    {/* <Profile></Profile> */}

    {/* <AvailItems></AvailItems> */}

    {/* <ItemManager></ItemManager> */}

    {/* <Profileconsumer></Profileconsumer> */}

    {/* <Dash></Dash> */}




    {/* <Dashconsumer></Dashconsumer> */}

    {/* <Find></Find> */}


    

    

    </BrowserRouter>

  
);