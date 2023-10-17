import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './screens/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import CreatePost from './screens/CreatePost';
import React from 'react';
import { LoginContext } from './context/loginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);


  return (
    <BrowserRouter>
    <div className="App">
    <LoginContext.Provider value={{setUserLogin, setmodalOpen}}>
    <Navbar login ={userLogin}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="/createPost" element={<CreatePost />}></Route>
        <Route path="/profile/:userid" element={<UserProfile />}></Route>
        <Route path="/followingpost" element={<MyFollowingPost />}></Route>
      </Routes>
      <ToastContainer theme='dark' />
      {modalOpen && <Modal setmodalOpen={setmodalOpen}></Modal>}
    </LoginContext.Provider>

      
    </div>
    </BrowserRouter>
  );
}

export default App;
