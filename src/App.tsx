import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Admin from './components/Administration/Admin';
import Cart from './components/Cart/Cart';
import DressList from './components/DressList/DressList';
import DressContextProvider from './context/DressContext';
import { AppContextProvider } from './context/AppContext';
import Nav from './components/Nav/Nav';

import './App.css';
import './RouterStyle/Sides.css'

const baseURL: string = `${process.env.REACT_APP_IS_PRODUCTION?process.env.REACT_APP_REMOTE_URL:process.env.REACT_APP_LOCAL_PATH}/api/`;

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

  return (
    <div className="App">
      <header>
        <a href="/">L Shopping</a>
      </header>
      <div className="Container">
      <AppContextProvider baseUrl={baseURL}>
        <DressContextProvider>
          <Router>
            <div className="sides">
              <div className="sidebar">
                <Nav />
                
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
