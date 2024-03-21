import '../App.css';
import SearchBar from '../custom_components/SearchBar';

export default function Home() {

    const handleOnClick = (event) => {
        switch(event) {
            case "browse":
                console.log('Browse all event clicked');
                break;
            default:
                break;
        }
    }

    return (
        <div className="Home">
            <div style={{display: 'flex', height: '100vh', width: '100%', justifyContent: 'space-evenly'}}>
                <div className='division' style={{backgroundColor: '#DDA15E', color: '#283618'}}>
                    <h3 style={{margin: '0', padding: '0', fontWeight: 'lighter', fontSize: '25px'}}>Metro Events</h3>
                    <h1 style={{margin: '0', padding: '0', fontSize: '43px'}}>CONNECT WITH <br/>EACH OTHER</h1>
                    <button className='browse_button' onClick={()=>{handleOnClick('browse')}}>Browse All Events</button>
                </div>
                <div className='division' style={{backgroundColor: '#283618', color: 'whitesmoke'}}>
                    <h2 style={{margin: '0', padding: '0', width: '100%', fontWeight: 'normal', fontSize: '30px'}}>
                        Search for a specific event
                    </h2>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
};