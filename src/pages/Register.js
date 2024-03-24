import { useState } from 'react';
import '../App.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnClick = () => {
        console.log('Confirming registration...');
    }

    return (
        <div className='flex h-fit bg-dark-green w-full justify-evenly'>
            <div className='division'>
                <h1 className='text-[30px] font-bold text-white'>JOIN THE COMMUNITY</h1>
                <h3 className='text-[20px] text-white font-light'>
                    Seek, engage, and discover events!
                </h3>
            </div>

            <div className='division' style={{borderLeft: '1px solid whitesmoke'}}>
                <div className='register_input'>
                    <h2 className='m-0 p-0 w-full text-start text-white text-[30px]'>
                        Get in touch!
                    </h2>
                    <hr className='w-[80%]'/>

                    <label htmlFor='firstName'>
                        First Name
                        <input
                            id='firstName'
                            type='text'
                            value={firstName}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                            placeholder='John'
                        />
                    </label>
                    <label htmlFor='lastName'>
                        Last Name
                        <input
                            id='lastName'
                            type='text'
                            value={lastName}
                            onChange={(e)=>{setLastName(e.target.value)}}
                            placeholder='Doe'
                        />
                    </label>
                    <label htmlFor='username'>
                        Username
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            placeholder='johndoe'
                        />
                    </label>
                    <label htmlFor='password'>
                        Password
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder='Type password'
                        />
                    </label>
                    <label htmlFor='confirmPassword'>
                        Confirm Password
                        <input
                            id='confirmPassword'
                            type='password'
                            value={confirmPassword}
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                            placeholder='Confirm password'
                        />
                    </label>
                    
                    <div className='flex w-full justify-end'>
                        <button className='text-[16px] px-[23px] py-[9px] hover:cursor-pointer hover:bg-light-green
                        text-white border border-white'>
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;