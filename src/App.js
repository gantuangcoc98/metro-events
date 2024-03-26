import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ButtonAppBar from './AppBar';
import Register from './pages/Register';
import Events from './pages/Events';
import { Admin } from './pages/Admin';
import { Organize } from './pages/Organize';
import { CreateEvent } from './pages/CreateEvent';
import { OrganizeEvent } from './pages/OrganizeEvent';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <ButtonAppBar style={{zIndex: '1'}}/>

        <div style={{zIndex: '0'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/events' element={<Events />} />
            <Route path='/organize' element={<Organize />} />
            <Route path='/organize/create' element={<CreateEvent />} />
            <Route path='/organize/event/:eventId' element={<OrganizeEvent />} />

            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
