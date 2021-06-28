import React, { useState,useEffect } from 'react'
import './Navbar.css';
import { NavLink,useHistory } from 'react-router-dom';
import { Container, NavDropdown } from 'react-bootstrap';
import image from './image.jpg'
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as IconName from "react-icons/bs";
import Dropdown from 'react-dropdown';
function Header() {
  const id=localStorage.getItem("id")
  const name=localStorage.getItem("name")
  const token=localStorage.getItem("token")
  const [users, setUser] = useState([])
  const [url, setUrl] = useState("");
  const [showLinks, setShowLinks] = useState(false);
//   let user=JSON.parse(localStorage.getItem("user-info"))
//   console.warn(user);
//   const { id} = user;
// console.warn(id)
  const history=useHistory();
  function logout(){
    localStorage.clear();
    history.push("/FormLogin")
}
useEffect(() => {
  getUsers();
}, [])
function getUsers() {
  fetch("https://boiling-shelf-43809.herokuapp.com/user/"+id+"/profile"
  , {
    headers:{
      "authorization":`${token}`
    }
  }
  ).then((result) => {
    result.json().then((resp) => {
      console.warn(resp)
      console.warn(resp.profile)
      setUser(resp.profile)
      setUrl(resp.profile.url)
    })
  })
}

let menu
if(localStorage.getItem("user-info")){
  // let user=JSON.parse(localStorage.getItem("user-info"))
  // const { id} = user;
 

  menu=(
    <>
    <div className="logo">
                ma<p>T </p> es
              </div>
          
      <div className="navbarSupportedContent">

        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink className="nav-link" to={"/Profile/"+id} exact>
              <BsIcons.BsFillPersonFill /> Profile
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Teams" exact>
              <IoIcons.IoMdPeople /> Teams
              </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Calendar" exact>
              <AiIcons.AiFillCalendar /> Calendar
              </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Message" exact>
              <AiIcons.AiFillMessage /> Messages
              </NavLink>
          </li>
         
        </ul>


      </div>
      <div className="navbar1">
        
        <div className="right" >
        {/* <span className="search">
            <input type="text" placeholder="search..."/>
          </span> */}
          <span className="notif">
            <AiIcons.AiFillBell />
          </span>
          <img src={url} style={{width:"50px",height:"50px",borderRadius:"50%",marginLeft:"10px"}}/>
         <NavDropdown title={name ? name :"user" }>
          <NavDropdown.Item> <AiIcons.AiFillSetting /> Setting</NavDropdown.Item>
          <NavDropdown.Item onClick={logout} > <IconName.BsBoxArrowRight /> Logout</NavDropdown.Item>
        </NavDropdown>
        


        </div>

      </div>


    </>
  )
}
else{
  menu=(
    <>
    <div className="logo">
                ma<p>T</p>es
             </div> 
             <div class="nav">
            <ul>
            <li><NavLink to="/FormLogin">Sign in</NavLink></li>
            <li>|</li>
            <li className="child"><NavLink to="/Form">Sign Up</NavLink></li>
            </ul>
            </div>

    </>
  )
}

  return (
    <nav className=" navbar-expand-lg navbar-mainbg">
    {menu}
   </nav>
    
  )
}
export default Header;