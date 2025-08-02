import React from 'react';
import './dash.css';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

function Dashconsumer() {
    const navigate = useNavigate();

    function openprofileconsumer() {
        navigate('/open_profile_consumer');
    }

    function openbuy() {
        navigate('/open_buy_items');
    }

   

    function logout() { 
    navigate('/openmaindashboard');
    }



    return (
        <>
            {/* Top Navbar */}
            <div className="bg-blue-950 h-16 flex justify-between items-center px-6 shadow-md">
                <h1 className="text-white text-2xl font-bold">Welcome, Consumer</h1>
                <button
                    type="button"
                    onClick={logout}
                    className="rounded-md bg-red-600 w-24 h-10 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition-all duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap justify-center gap-12 p-10">
                {/* Profile Card */}
                <Card
                    className="custom-card"
                    imgSrc="pics/profile consumer.png"
                >
                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={openprofileconsumer}
                            className="custom-button"
                        >
                            View Profile
                        </button>
                    </div>
                </Card>

                {/* Buy Items Card */}
                <Card
                    className="custom-card"
                    imgSrc="pics/grocery-cart.png"
                >
                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={openbuy}
                            className="custom-button bg-green-600 hover:bg-green-500"
                        >
                            Buy Items
                        </button>
                    </div>
                </Card>

               

            
            </div>
        </>
    );
}

export default Dashconsumer;
