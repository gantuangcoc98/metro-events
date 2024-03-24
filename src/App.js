import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ButtonAppBar from './AppBar';
import Register from './pages/Register';
import Events from './pages/Events';
import { Admin } from './pages/Admin';
import { ClearLocalStorage } from './custom_components/ClearLocalStorage';
import { Organize } from './pages/Organize';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col">
        {/* <ClearLocalStorage /> */}
        <ButtonAppBar style={{zIndex: '1'}}/>

        <div style={{zIndex: '0'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/events' element={<Events />} />
            <Route path='/organize' element={<Organize />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
