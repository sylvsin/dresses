import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Admin from './components/Administration/Admin';
import Cart from './components/Cart/Cart';
import DressList from './components/DressList/DressList';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import DressContextProvider from './context/DressContext';
import { AppContextProvider } from './context/AppContext';

library.add(fas);

const baseURL: string = "http://localhost:5000/api/";

const App: React.FC = () => {
  const routes = [
    {
      path: "/Cart",
      sidebar: () => <div>cart!</div>,
      main: () => <Cart />
    },
    {
      path: "/Admin",
      sidebar: () => <div>Admin!</div>,
      main: () => <Admin />
    },
    {
      path: "/",
      exact: true,
      sidebar: () => <div>DressList!</div>,
      main: () => <DressList />
    },
  ];

  const dressesStyle = {
    listStyle: "none",
    textDecoration: "none",
    padding: 0
  }

  return (
    <div className="App">
      <header>
        <a href="/">L Shopping</a>
      </header>
      <div className="Container">
      <AppContextProvider baseUrl={baseURL}>
        <DressContextProvider>
          <Router>
            <div style={{ display: "flex" }}>
              <div className="sidebar"
                style={{ 
                  padding: "20px",
                  width: "15%",
                  height: "140vh",
                  background: "#f0f0f0",
                }}
              >
                <ul style={ dressesStyle }>
                  <li>
                    <NavLink exact to="/" activeClassName="selected" activeStyle={{fontWeight: "bold",color: "#2F4F4F"}}><img src="/images/logo1.jpg"  alt=''/></NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/" activeClassName="selected" activeStyle={{fontWeight: "bold",color: "#2F4F4F"}} style={{ textDecoration: "none" }}><FontAwesomeIcon className="fas fa-home" icon='home'/>Dresses</NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/cart" activeClassName="selected" activeStyle={{fontWeight: "bold",color: "#2F4F4F"}} style={{ textDecoration: "none" }}><FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/>{" "}  Cart</NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/admin" activeClassName="selected" activeStyle={{fontWeight: "bold",color: "#2F4F4F"}} style={{ textDecoration: "none" }}><FontAwesomeIcon className="fas fa-user" icon='user' />{" "} Admin</NavLink>
                  </li>
                </ul>

                <Switch>
                  {
                    routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        children={<route.sidebar />}
                      />
                  ))}
                </Switch>
              </div>

              <div style={{ flex: 1, padding: "10px", backgroundColor: "eee" }}>
                <Switch>
                  {
                    routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                      />
                  ))}
                </Switch>
              </div>
            </div>
          </Router>
        </DressContextProvider>
      </AppContextProvider>
      </div>
      <footer className="footer">
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
