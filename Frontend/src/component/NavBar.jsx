import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../img/logo.png";
import Switch from "react-switch";

class NavBar extends Component {
  
  render() {
    console.log("name--->",this.props.loginInfo["Name"])
   
    return (
      <div>
       


            <Navbar bg="light" expand="lg" className="nav-bar" fixed="top"  id="main-nav">
      
         
  
        <h1 style={{textAlign:'center'}}>EasyAccess</h1>
        
            
           
            
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
         
        
        
          <Navbar.Collapse id="logout-navbar-nav">
            <Nav className="ml-auto">             
              <a  onClick={this.props.onClick} className="navbar-right-content">
               
            {this.props.loginInfo["Name"]}

                </a>
              <a onClick={this.props.onLogout} style={{"cursor":"pointer"}}className="navbar-right-content">Log Out</a>
            </Nav>
          </Navbar.Collapse>
       
       
      </Navbar>


      </div>
    );
  }
}

export default NavBar;
