import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameFlag, setUsernameFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);

    const navigate = useNavigate();

    const checkInput = () => {
        return !firstName || !lastName || !username || !password || !confirmPassword;
    }

    const registerAccount = () => {
        console.log('Processing registration...');
        if (checkInput()) {
            setEmptyFields(true);
            console.log('All fields should not be empty!');
        } else if (password === confirmPassword) {

            const newAccount = {
                userId: 0,
                firstname: firstName,
                lastname: lastName,
                username: username,
                password: password,
                userType: 0,
                events: [],
                participates: [],
            }
            
            const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];
            newAccount.userId = accounts.length;

            const usernameExist = accounts.some(account => account.username === username);
            if (usernameExist) {
                setUsernameFlag(true);
                console.log('Username already exist!');
            } else {
                accounts.push(newAccount);
                window.localStorage.setItem('accounts', JSON.stringify(accounts));
                navigate('/login');
            }
        } else {
            console.log('Password did not match!');
            setPasswordFlag(true);
        }
        
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
                            onFocus={()=>{
                                setEmptyFields(false);
                            }}
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
                            onFocus={()=>{
                                setEmptyFields(false);
                            }}
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
                            onFocus={()=>{
                                setUsernameFlag(false);
                                setEmptyFields(false);
                            }}
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
                            onFocus={()=>{
                                setPasswordFlag(false);
                                setEmptyFields(false);
                            }}
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
                            onFocus={()=>{
                                setPasswordFlag(false);
                                setEmptyFields(false);
                            }}
                            placeholder='Confirm password'
                        />
                    </label>
                    
                    {usernameFlag ? 
                        <h6 className='warning_message'>Username already exist!</h6>
                        :
                        passwordFlag && <h6 className='warning_message'>Password did not match!</h6>
                    }
                    {emptyFields && <h6 className='warning_message'>All fields should not be empty!</h6>}

                    <div className='flex w-full justify-end'>
                        <button className='text-[16px] px-[23px] py-[9px] hover:cursor-pointer hover:bg-light-green
                        text-white border border-white'
                            onClick={()=>{registerAccount()}}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;