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
      <div className="App">
        <ButtonAppBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Events' element={<Events/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
