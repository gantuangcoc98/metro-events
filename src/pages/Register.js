import { useState } from 'react';
import '../App.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnClick = () => {
        console.log('Confirming registration...');
    }

    return (
        <div className='Register'>
            <div className='division'>
                <h1 style={{margin: '0', padding: '0', color: 'whitesmoke'}}>JOIN THE COMMUNITY</h1>
                <h3 style={{
                        margin: '0', padding: '0', fontWeight: 'normal', color: 'whitesmoke'
                    }}
                >
                    Seek, engage, and discover events!
                </h3>
            </div>

            <div className='division' style={{borderLeft: '1px solid whitesmoke'}}>
                <div className='register_input'>
                    <h2 style={{
                            margin: '0', padding: '0',
                            width: '100%',
                            textAlign: 'start',
                            color: 'whitesmoke',
                        }}
                    >
                        Get in touch!
                    </h2>
                    <hr style={{width: '100%'}}/>

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
                    <label htmlFor='email'>
                        Email Address
                        <input
                            id='email'
                            type='text'
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder='example@email.com'
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
                    
                    <div style={{display: 'flex', width: '100%', justifyContent: 'end'}}>
                        <button className='proceed_button' onClick={()=>{handleOnClick()}}>Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;