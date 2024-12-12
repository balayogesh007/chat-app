import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { SignInFormComponent } from './components/user-forms/SignInForm';
import { SignUpFormComponent } from './components/user-forms/SignUpForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignInFormComponent/>}></Route>
        <Route path='/register' element={<SignUpFormComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
