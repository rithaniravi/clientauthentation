
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './components/signup';
import Home from './components/useForm';
import Dashboard from './components/dashboard';
import Otp from './components/otp';


function App() {
     // user is in login same user open next open next tap open home page is shown(i.e.., empty page)  
  const login = window.localStorage.getItem("isLogedIn");
 
  return (
    <div class="App">
     
      <BrowserRouter>
      
         <Routes>
            <Route path='/' element={login ? <Home/>:<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/otp' element={<Otp/>}></Route>
         </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
