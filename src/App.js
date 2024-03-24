import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ButtonAppBar from './AppBar';
import Register from './pages/Register';
import Events from './pages/Events';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <ButtonAppBar style={{zIndex: '1'}}/>

        <div style={{zIndex: '0'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/events' element={<Events />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
