import './App.css';
import ButtonAppBar from './AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ButtonAppBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
