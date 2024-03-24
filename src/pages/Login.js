import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-transparent h-[100vh]">
            <div className='flex h-full bg-light-brown w-full'>
                <div className='input_container'>
                    <h1 className='text-[30px] font-bold'>Login</h1>

                    <div className='flex text-lg flex-col w-[50%]'>
                        <label className='flex flex-col mb-[10px]'
                            htmlFor='username'>
                            Username:
                            <input
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                                className='input_style'
                            />
                        </label>
                        <label className='flex flex-col mb-[10px]'
                            htmlFor='password'>Password:
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                className='input_style'
                            />
                        </label>
                        <div className='flex justify-end items-center'>
                            <button className='mt-[10px] bg-transparent border border-black px-[30px] py-[9px] text-[20px] hover:bg-lighter-brown hover:border-2
                                hover:border-black hover:cursor-pointer'>
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{borderLeft: '2px solid #283618'}}/>
                
                <div className='input_container'>
                    <h1 className='text-[30px] font-bold'>NO ACCOUNT YET?</h1>
                    <h3 className='text-[20px] hover:cursor-pointer'
                        onClick={()=>{navigate('/register')}}>
                        Register here
                    </h3>
                </div>
            </div>    
        </div>
    )
};