
import unlock from '../asset/unlock.png'
import aavar from '../asset/aavar.png'
import './login.css'
import axios from 'axios'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    
    const navigate=useNavigate() 
    const[email,setEmail]=useState()
   
    window.localStorage.setItem("isLogedIn",true)
    axios.defaults.withCredentials = true;
    const handleSubmit=(e)=>{
        e.preventDefault()
           axios.post('http://localhost:3001/otpsend', {email})
            .then(res=>{console.log(res.data)})
            .catch(err=> console.log(err))
            navigate("/otp",{state:email})
            alert("check your mail")
    }
    
    return(
        <div class="container bg-gradient-to-r from-yellow-300 to-white-500">
            
            <div class="container-body w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <img src={unlock} class=" unlock hidden rounded-md lg:block w-2/4 p-2 mx-auto" alt="" />
                <form class="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <img src={aavar} class=" aavar w-32" alt="" />
                    <h2 class="my-8 font-display font-bold text-3xl text-gray-500 text-center">Welcome You</h2>
                    <div class="relative mt-6">
                        <i class="fa fa-user absolute text-primarycolor text-xl pl-2 mt-2"></i>
                        <input 
                        type='text'
                        class="email pl-9 border-2 rounded-lg p-2 font-display outline-0 text-lg focus:border-primarycolor transition" 
                        placeholder='username'
                        onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <a class="mt-3 self-center text-primarycolor" href="/">Forget Password?</a>
                    <button class="mt-3 py-3 px-20 bg-primarycolor rounded-md text-white font-bold text-md" >Login</button>
                    <p class="mt-3">Don't have an account?<Link to='/signup' class="text-primarycolor"> Sign up for free</Link></p>
                </form>
                
            

            </div>



        </div>
    )
}


export default Login;