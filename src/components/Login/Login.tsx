import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

async function loginUser(credentials: any) {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

const Login: React.FC<any> = ({setToken}) => {
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
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
