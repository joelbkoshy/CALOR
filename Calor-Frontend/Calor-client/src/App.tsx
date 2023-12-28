import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChatMain from './pages/ChatMain';
import { createContext} from 'react';
import '../src/App.css'


// const [chatId,setChatId] = useState<any>(null)

const ChatContext = createContext<any>(null);

function App() {
  return (
    // <ChatContext.Provider >
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
    // </ChatContext.Provider>

  );
}

export default App;
