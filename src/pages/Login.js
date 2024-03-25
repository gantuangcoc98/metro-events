import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleOnClick = () => {
        const storedUsername = localStorage.getItem('loginUsername');
        const storedPassword = localStorage.getItem('loginPassword');
        
        // Simple Authentication ilisan rani nato gar  kung mag database nata gamit springboot
        if (username === storedUsername && password === storedPassword) {
            
            navigate('/events');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="Login">
            <div className='login_wrapper'>
                <div className='input_container'>
                    <h1 style={{margin: '0', padding: '0'}}>Login</h1>

                    <div
                        style={{
                            display: 'flex',
                            fontSize: 'larger',
                            flexDirection: 'column',
                            gap: '10px',
                            width: '50%'
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
                            <button className='proceed_button' onClick={handleOnClick}>Proceed</button>
                        </div>
                    </div>
                </div>
                <div className='vertical_line' style={{borderLeft: '2px solid #283618'}}/>
                <div className='input_container'>
                    <h1 style={{margin: '0', padding: '0'}}>NO ACCOUNT YET?</h1>
                    <h3 style={{
                            margin: '0', padding: '0', fontWeight: 'normal', cursor: 'pointer'
                        }} 
                        onClick={()=>{navigate('/register')}}
                    >
                        Register here
                    </h3>
                </div>
            </div>    
        </div>
    );
}
