import { useNavigate } from 'react-router-dom';
import '../App.css';
import SearchBar from '../custom_components/SearchBar';
import { useEffect } from 'react';

export default function Home() {

    const navigate = useNavigate();

    const handleOnClick = (event) => {
        switch(event) {
            case "browse":
                navigate('/events');
                console.log('Navigating to events page...');
                break;
            default:
                break;
        }
    }

    return (
        <div className="flex flex-col items-center h-[100vh]">
            <div style={{display: 'flex', height: '100vh', width: '100%', justifyContent: 'space-evenly'}}>
                <div className='division' style={{backgroundColor: '#DDA15E', color: '#283618'}}>
                    <h3 className='font-light text-[25px] p-0 m-0'
                    >Metro Events</h3>
                    
                    <h1 className='m-0 p-0 text-[43px] font-bold'
                    >CONNECT WITH <br/>EACH OTHER</h1>
                    
                    <button className='border border-dark-green px-[23px] py-[9px] text-[20px] text-dark-green hover:cursor-pointer hover:bg-dark-brown
                            hover:border-2 hover:border-dark-green' 
                        onClick={()=>{handleOnClick('browse')}}
                    >Browse All Events</button>
                </div>
                <div className='division' style={{backgroundColor: '#283618', color: 'whitesmoke'}}>
                    <h2 className='m-0 p-0 w-full font-normal text-[30px]'
                    >Search for a specific event
                    </h2>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
};