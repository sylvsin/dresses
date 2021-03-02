import React from 'react';
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Nav: React.FC = () => {
  return (
    <ul className="linksStyle">
                <li>
                  <NavLink exact to="/" activeClassName="selected" 
                    activeStyle={{fontWeight:"bold", color:"2F4F4F"}}
                  >
                    <img src="/images/logo1.jpg" alt="" />
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/" activeClassName="selected"
                    activeStyle={{fontWeight:"bold", color:"2F4F4F"}}
                  >
                    <FontAwesomeIcon className="fas fa-home" icon='home'/> Dresses 
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="Cart" activeClassName="selected"
                    activeStyle={{fontWeight:"bold", color:"2F4F4F"}}
                  >
                    <FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/>{" "} Cart 
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="Admin" activeClassName="selected"
                    activeStyle={{fontWeight:"bold", color:"2F4F4F"}}
                  >
                    <FontAwesomeIcon className="fas fa-user" icon='user'/>{" "} Admin 
                  </NavLink>
                </li>
              </ul>
  );
}

export default Nav;
