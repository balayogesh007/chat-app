import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { SignInFormComponent } from './components/user-forms/SignInForm';
import { SignUpFormComponent } from './components/user-forms/SignUpForm';
import { ChatWindowComponent } from './components/chat-module/ChatWindow/ChatWindow';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignInFormComponent/>}></Route>
        <Route path='/register' element={<SignUpFormComponent/>}></Route>
        <Route path='/chat' element={<ChatWindowComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
