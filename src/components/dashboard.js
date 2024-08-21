import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {FaBars,  FaUserCircle} from 'react-icons/fa';
import './dashboard.css';

const Dashboard=()=>{
    const [message,setMessage]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials = true;


    // varify token for authorized user
    const user = () => {
        let token = localStorage.getItem("userdbtoken");
        if (token) {
          console.log("user valid")
          
        } else {
          navigate("/")
        }
      }

//get dashboard for user o/p for user is display in console
    useEffect(() => {
        user();
        axios.get(process.env.REACT_APP_API_URL+'/dashboard')
        .then(res=> {
            if (res.data.valid){
                setMessage(res.data.message)
            }else{
                navigate('/')
            }
        })
        .catch(err=> console.log(err))
      },[])
    
    //logout function to remove token in local storage
    const onSubmit=()=>{
          window.localStorage.removeItem("isLogedIn")
          navigate('/login')
          alert("logout Successfully")
         
      }
     
    return(
        <div class="body bg-gradient-to-r from-yellow-300 to-white-500 w-screen h-screen">
            
            <nav class="px-4 py-3 flex justify-between">
                <div class="flex items-center text-xl">
                    <FaBars class="text-gray-500 me-4 cursor-pointer"/>
                    <span class="text-gray-500 font-semibold ml-2">Dashboard {message}</span>
                </div>
                <div class="flex items-center gap-x-5">
                    <div class="relative">
                        <button class="text-primarycolor group">
                            <FaUserCircle class="w-6 h-6 mt-1"/>
                        <div class="z-10 hidden absolute  bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
                            <ul class="py-2 text-sm text-primarycolor">
                                <li onClick={onSubmit}>Logout</li> 
                            </ul>   
                        </div>
                        </button>
                    </div>
                </div>
            </nav>
            <h6 class="font-bold text-xl justify-center item-center pl-2 pt-2 mx-auto">Dashboard {message}</h6>
        </div>
    )
}
export default Dashboard;