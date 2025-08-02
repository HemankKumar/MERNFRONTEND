import { Routes, Route, Navigate } from 'react-router-dom';
import MainDashboard from "./Main_Dashboard/dashboard";
import Login from "./Login/Login";
import DashConsumer from "./Dashboard_Consumer/dashs";
import Signup from "./signup/signup";
import Dash from "./Dashboard_Grower/dash";
import Profile from "./Profile_Form/profile";
import AvailItems from "./Avail_Products/AvailItems";
import ItemManager from "./item_manager/items";
import ProfileConsumer from "./Profie_form-consumer/profile";
import Findss from "./buy_products/products";

export function App(){
    return(

            <Routes>

                
                <Route path="/" element={<Navigate to="/openmaindashboard" />} />
                <Route path="/openmaindashboard" element={<MainDashboard />} />

                <Route path="/openloginpg" element={<Login></Login>}></Route>
                <Route path="/opensignuppage" element={<Signup></Signup>}></Route>
                
                
                <Route path="/openconsumerdashboard" element={<DashConsumer></DashConsumer>}></Route>
                <Route path="/opengrowerdashboard" element={<Dash></Dash>}></Route>

                <Route path="/open_grower_profile" element={<Profile></Profile>}></Route>

                <Route path="/open_avail_item" element={<AvailItems></AvailItems>}></Route>

                <Route path="/open_item_manager" element={<ItemManager></ItemManager>}></Route>

                <Route path="/open_profile_consumer" element={<ProfileConsumer></ProfileConsumer>}></Route>

                <Route path="/open_buy_items" element={<Findss></Findss>}></Route>
                


            </Routes>

        
    )
  
}