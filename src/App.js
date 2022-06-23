import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './App.css';
import Main from './pages/Main';
import Mypage from './pages/setting/Mypage';
import AvatarSetting from './pages/setting/AvatarSetting';
import Sidebar from './components/menu/Sidebar';
import MypageChange from './pages/setting/MypageChange';
import Teammain from './pages/team/Teammain';
import AvatarAdd from './pages/setting/AvatarAdd';
import Header from './components/menu/Header';
import TeamAdd from './pages/team/TeamAdd';

function App() {
  const [currPath, setCurrPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);

  return (
    <BrowserRouter>
      {currPath !== '/login' && currPath !== '/signup' && (
        <>
          <Sidebar /> <Header />
        </>
      )}
      <div className='contents'>
        <Routes>
          <Route path='/login' element={<Login />} exact />
          <Route path='/signup' element={<Signup />} />
          {/* 임시 */}
          <Route path='/' element={<Main />} />
          <Route path='/avataradd' element={<AvatarAdd />} />
          <Route path='/avatarsetting' element={<AvatarSetting />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/mypagechange' element={<MypageChange />} />
          <Route path='/team' element={<Teammain />} />
          <Route path='/teamadd' element={<TeamAdd />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
