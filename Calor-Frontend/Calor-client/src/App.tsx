import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChatMain from './pages/ChatMain';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/main' element={<ChatMain />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
