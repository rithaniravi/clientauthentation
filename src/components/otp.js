import { useState} from "react"
import axios from "axios"
import { useNavigate,useLocation } from 'react-router-dom';


const Otp =() =>{

  const[otp,setOtp]=useState("")
  //using location for current email to send otp to mailID
  const location= useLocation()
  const navigate=useNavigate()
    
  axios.defaults.withCredentials = true;
  // submit otp if it correct navigate to dashboard page otherwise return error 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (otp === "") {
          alert("Enter Your Otp")
        } else if (!/[^a-zA-Z]/.test(otp)) {
          alert("Enter Valid Otp")
        } else if (otp.length < 6) {
          alert("Otp Length minimum 6 digit")
        } else {
          const data = {
            otp, email: location.state
          }
        
        axios.post("http://localhost:3001/verifyotp", data)
        .then(response=>{
            if (response.status === 200) {
                localStorage.setItem("userdbtoken", response.data.userToken);
                 alert(response.data.message);
                 console.log(response.data)
                 setTimeout(() => {
                   navigate("/dashboard")
                 }, 5000)
               } else {
                 alert(response.response.data.error)
               }

        })
         
        }
      }
    return(
        <div class=" container bg-gradient-to-r from-yellow-300 to-white-500">
            <div class="container-body w-screen h-screen flex justify-center items-center lg:grid lg:grid-cols-1">
                <form  class="mx-auto" onSubmit={handleSubmit}>
                    <h5 class="text-primarycolor text-xl font-bold">OTP Verification</h5>
                    <div class=' mt-3'>
                        <input 
                        type="text" 
                        name='OTP'
                        required="required" 
                        placeholder="OTP 6 digit" 
                        onChange={(e)=>setOtp(e.target.value)}
                        class="border border-2 rounded-lg p-2 font-display outline-0 text-md w-full
                        focus:border-primarycolor transition"/>

                        <button class=" mt-5  py-3 px-10 bg-primarycolor rounded-md text-white font-bold text-md">
                            Submit</button>
                    </div>
                   
                </form>
             </div>
         </div>

    )
}

export default Otp;