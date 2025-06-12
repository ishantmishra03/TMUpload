import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar/Navbar';
import SecureRoute from "./components/Secure/SecureRoute";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import File from './pages/File';
import List from "./pages/List";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/f/:id' element={<File />}/>
        <Route path='/login' element={
            <Login />
        }/>
        <Route path='/upload' element={
          <SecureRoute>
            <Upload />
          </SecureRoute>
        }/>
        <Route path='/list' element={
          <SecureRoute>
            <List />
          </SecureRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
