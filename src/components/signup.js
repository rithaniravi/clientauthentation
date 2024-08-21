import signup from '../asset/signup.png'
import { useState } from 'react'
import axios from 'axios';
import validation from './validation';
import { Link, useNavigate } from 'react-router-dom';

const Signup=()=>{
    const [password,setPassword]=useState({})
    const navigate=useNavigate() 
    // inputs collect from users
    const[values,setValues]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
    });
    const[errors,setErrors]=useState({});
    // validation for email id 
    const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
    setErrors(validation(values))
    }
    // submitting form
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('/signin',values)
        .then(res=>{
            if(res.data.valid){
                navigate('/login')
                alert("Your account has been created")
                console.log(res)}
            
            else{
                alert("already exist account")
                navigate('/login')
            }})
        .catch((err)=>console.log(err))
    }

    
    return(
        <div class="body bg-gradient-to-r from-yellow-200 to-white-500">

            <div class="container-body w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <p class="text-primarycolor font-bold text-3xl mt-5">
                    Register Here!<br></br>
                    Create an account for free
                    <img src={signup} class=" unlock hidden rounded-md lg:block w-3/4 p-2 mx-auto" alt="" />
                </p>
                <form onSubmit={handleSubmit} class="mx-auto">
                    
                    <div class='grid gap-5 ml-2 mt-2'>
                        <input 
                        type="text" 
                        name='firstname'
                        required="required" 
                        placeholder="first name" 
                        value={values.firstname}  
                        onChange={handleChange}
                        class="border border-2 rounded-lg p-2 font-display outline-0 text-md w-full
                        focus:border-primarycolor transition"/>
                   

                        <input 
                        type="text" 
                        name='lastname'
                        placeholder="last name" 
                        required="required" 
                        value={values.lastname} 
                        onChange={handleChange}
                        class="border border-2 rounded-lg p-2 font-display outline-0 text-md w-full
                        focus:border-primarycolor transition"/>
                        
                    </div>
                    <div class="mt-3 ml-2">
                        <input 
                        type="text" 
                        name='email'
                        placeholder="email"  
                        required="required" 
                        value={values.email}
                        class="border border-2 rounded-lg p-2 font-display  outline-0 text-md w-full
                        focus:border-primarycolor transition"
                        onChange={handleChange}/>
                        {errors.email && <p class="text-red-500">{errors.email}</p>}
                        
                    </div>
                    <div>
                    <div class="mt-3 ml-2 flex">
                       <div class='relative w-full'>
                       <input 
                        type={!password ? "password":"text"}
                        required="required"  
                        name='password'
                        placeholder="Password"  
                        value={values.password}
                        class="border border-2 rounded-lg p-2 font-display outline-0 text-md w-full
                        focus:border-primarycolor transition "
                        onChange={handleChange}/>
                       </div>
                        <div class="showpass bg-gray-200 w-14 h-8 p-1 cursor-pointer rounded-lg mt-2 ml-60 absolute" 
                             onClick={()=>setPassword(!password)}>
                            {!password ? "Show":"Hide"}
                        </div>
                        {errors.password && <p class="text-red-500">{errors.password}</p>}
                    </div>
                 
                    </div>
                    <div class="mt-3 ml-2 self-start">
                        <input 
                        type="checkbox" 
                        required="required" 
                        class='border-2 cursor-pointer border-primarycolor outline:none'
                        />
                        <span class='ml-2'>I accept the <a href="/" class="text-primarycolor">Terms of  Use</a> &  
                        <a href="/" class="text-primarycolor"> Privacy Policy</a></span>
                    </div>
                    <div class="btn mt-5">
                        <button type="submit"
                                              
                        class='w-1/2 bg-primarycolor text-white hover:bg-primarycolor-400 cursor-pointer font-bold rounded-md py-3 px-10'>Register</button>

                    </div>
                    {/* user already have account page navigate to login page */}
                    <div class='my-2'> 
                        <Link to='/login' class='text-primarycolor text-decoration'>Already have account?</Link>
                    </div>
                </form>

            </div>
          

        </div>
    )

}

export default Signup;