import Home from "./components/Home.jsx"
import AdminDashboard from "./components/Admin.jsx"
import {Routes,Route} from "react-router-dom"
import { createContext } from "react"
import { useState } from "react"
import Container from "./components/Container.jsx"
import Contact from "./components/Contact.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import AboutUs from "./components/AboutUs.jsx"
import { useEffect } from "react"
import axios from "axios"
const Namecontext=createContext()
function App()
{
  const [userList, setUserList] = useState([{
    _id:"",
    userName: "Pream",
    password: "12345",
    emailId:"",
    confirmPassword:"",
    phoneNumber: "",
  },
]); 

hideHeaderOnScroll=()=>{
  (function(){

    var doc = document.documentElement;
    var w = window;
  
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;
  
    var header = document.querySelector('.header');
  
    var checkScroll = function() {
  
      /*
      ** Find the direction of scroll
      ** 0 - initial, 1 - up, 2 - down
      */
  
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) { 
        //scrolled up
        direction = 2;
      }
      else if (curScroll < prevScroll) { 
        //scrolled down
        direction = 1;
      }
  
      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }
      
      prevScroll = curScroll;
    };
  
    var toggleHeader = function(direction, curScroll) {
      if (direction === 2 && curScroll > 100) { 
        
  
        header.classList.add('hide-header');
        prevDirection = direction;
      }
      else if (direction === 1) {
        header.classList.remove('hide-header');
        prevDirection = direction;
      }
    };
    
    window.addEventListener('scroll', checkScroll);
  
  })();
}
  
const [selectedUser,setSelectedUser]=useState([ 
  {id:1,desc:"WaterWash", price:"₹100", address:"", vehicleModel:"",date:""},
  {id:2, desc: 'Oil Change', price: '₹80', address:"",vehicleModel:"" ,date:""},
  {id:3, desc: 'Engine Work',price: '₹60', address:"",vehicleModel:"",date:""},
  {id:4, desc: 'General Service', price: '₹120', address:"",vehicleModel:"",date:""},
  ])

  useEffect(()=>{
    const _id = localStorage.getItem("userId")

    console.log("userID",_id);

    if (_id !== null)
    {
      getUser(_id);
       

    }

  },[])

  const getUser = async (_id) => {

    if (_id > 0){
      const response = await axios.get(`http://localhost:3001/User/login`);
      setUserList(response.data);
  
      console.log(response.data);
    }   

  }
  
  return(<div>
    <Namecontext.Provider value={{userList,setUserList,selectedUser,setSelectedUser}}> 
    <Routes>
      <Route element={<Home/>} path="/"></Route>
      <Route element={<AdminDashboard/>} path="/admin"></Route>
       <Route element={<Container/>}></Route>
       <Route path="/" element={<Login userList={userList} setUserList={setUserList} />}></Route>
        <Route path="/signup" element={<Signup userList={userList} setUserList={setUserList} />}></Route>
       <Route element={<Contact/>} path="/contact"></Route>
       <Route element={<AboutUs/>} path="/aboutus"></Route>       
      </Routes>
      </Namecontext.Provider>
  </div>)
}

export default App
export {Namecontext}