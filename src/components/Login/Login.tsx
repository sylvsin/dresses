import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';
import { AppContext } from '../../context/AppContext';
import { AxiosInstance } from 'axios';

async function loginUser(credentials: any, api:AxiosInstance | undefined
    ) {
        let data:any = ''
         if (api) {
          data = await  api
              .post("login", credentials)
              .then((response) => {
                return response.data;
              })
              .then((data) => {
                  console.log("data")
                return data
              });
          }
    return data
}

const Login: React.FC<any> = ({setToken}) => {
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const { api } = useContext(AppContext);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        }, api);
        setToken(token);
    }

    return (
        <div className="login-admin">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} 
                    />
                </label>

                <label>
                    <p>Password</p>
                    <input type="password" 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    />
                </label>

                <div className="submit-button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
