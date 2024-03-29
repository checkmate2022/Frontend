import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './App.css';
import Main from './pages/Main';
import Mypage from './pages/setting/Mypage';
import AvatarSetting from './pages/setting/AvatarSetting';
import MypageChange from './pages/setting/MypageChange';
import TeamMain from './pages/team/TeamMain';
import AvatarAdd from './pages/setting/AvatarAdd';
import Header from './components/menu/Header';
import TeamAdd from './pages/team/TeamAdd';
import TeamDashboard from './pages/team/TeamDashboard';
import TeamBoard from './pages/team/TeamBoard';
import TeamMember from './pages/team/TeamMember';
import TeamSetting from './pages/team/TeamSetting';
import ScheduleAdd from './pages/team/ScheduleAdd';
import TeamChannel from './pages/team/TeamChannel';
import BoardAdd from './pages/team/BoardAdd';
import ScheduleSetting from './pages/team/ScheduleSetting';
import MeetingRoom from './pages/meeting/MeetingRoom';
import BoardChange from './pages/team/BoardChange';
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler';
import { onTokenRefresh } from './api/auth';

function App() {
  const [currPath, setCurrPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrPath(window.location.pathname);
    console.log(window.location.pathname);
  }, []);

  useEffect(() => {
    onTokenRefresh();
  });

  return (
    <RecoilRoot>
      <BrowserRouter>
        {currPath !== '/' &&
          currPath !== '/signup' &&
          currPath !== '/team/:teamId/meeting/:meetingId' && (
            <>
              <Header />
            </>
          )}
        <div className='contents'>
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/oauth2/redirect'
              element={<OAuth2RedirectHandler />}
            />
            {/* 임시 */}
            <Route path='/main' element={<Main />} />
            <Route path='/avataradd' element={<AvatarAdd />} />
            <Route path='/avatarsetting' element={<AvatarSetting />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/mypagechange' element={<MypageChange />} />
            {/* 팀 */}
            <Route path='/team' element={<TeamMain />} />
            <Route path='/teamadd' element={<TeamAdd />} />
            <Route path='/team/:teamId/dashboard' element={<TeamDashboard />} />
            <Route
              path='/team/:teamId/dashboard/scheduleadd'
              element={<ScheduleAdd />}
            />
            <Route
              path='/team/:teamId/dashboard/:scheduleSeq'
              element={<ScheduleSetting />}
            />
            {/* 팀 채널*/}
            <Route
              path='/team/:teamId/teamchannel/:channelId/boardadd'
              element={<BoardAdd />}
            />
            <Route
              path='/team/:teamId/teamchannel/:channelId'
              element={<TeamChannel />}
            />
            <Route
              path='/team/:teamId/teamchannel/:channelId/board/:boardId'
              element={<TeamBoard />}
            />
            <Route
              path='/team/:teamId/teamchannel/:channelId/board/:boardId/change'
              element={<BoardChange />}
            />
            <Route path='/team/:teamId/teammember' element={<TeamMember />} />
            <Route path='/team/:teamId/teamsetting' element={<TeamSetting />} />

            {/* 화상회의 */}
            <Route
              path='/team/:teamId/meeting/:meetingId'
              element={<MeetingRoom />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
