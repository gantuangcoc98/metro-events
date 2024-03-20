import { useState } from 'react';
import '../App.css';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <div className="Login">
            <div className='login_wrapper'>
                <div className='input_container'>
                    <h1 style={{margin: '0', padding: '0', marginBottom: '10px', cursor: 'default'}}>Login</h1>

                    <div
                        style={{
                            display: 'flex',
                            width: '200%',
                            fontSize: 'larger',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <label htmlFor='username'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            Username:
                            <input
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                                className='input_style'
                            />
                        </label>
                        <label htmlFor='password'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            Password:
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                className='input_style'
                            />
                        </label>
                        <div style={{display:'flex', justifyContent:'end', alignItems: 'center'}}>
                            <button className='login_button'>Proceed</button>
                        </div>
                    </div>
                </div>
                <div className='vertical_line' style={{borderLeft: '2px solid black'}}/>
                <div className='input_container'>
                    <h1 style={{margin: '0', padding: '0'}}>No account yet?</h1>
                    <p>Register here</p>
                </div>
            </div>    
        </div>
    )
};