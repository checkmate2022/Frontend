import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LeaderData, MypageData, TeamData } from './SidebarData';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil';
import { leaderState, menuState, teamState } from '../../store/userstore';
import ChannelAddModal from '../team/ChannelAddModal';
import ChannelNavModal from './ChannelNavModal';
import { onUserIdInfoGet } from '../../api/auth';
import { onTeamLeaderGet, onTeamMemberGet } from '../../api/team';
import Loading from '../Loading';

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 10.5rem;
  height: 100%;
  top: 90px;
  background-color: ${colors.white};
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
  // border-right: thick solid ${colors.purple};
  background-color: ${colors.white};
  margin-top: 80%;
`;

const StyledNav = styled.nav`
  display: flex;
`;

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li`
  margin-bottom: 17px;
`;

function Sidebar() {
  const teamId = useRecoilValue(teamState);
  const [menutype, setMenuType] = useRecoilState(menuState);

  const [dataType, setDataType] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [leaderId, setLeaderId] = useState('');

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(`/team/${teamId}`)) {
      //setLoading(true);
      onUserIdInfoGet(setUserId);
      onTeamLeaderGet(setLeaderId, teamId, setLoading);
      if (userId === leaderId) {
        setDataType(LeaderData);
      } else {
        setDataType(TeamData);
      }
      if (location.pathname.includes('meeting')) {
        setDataType([]);
      }
    } else if (location.pathname === '/main') {
      setDataType([]);
    } else if (location.pathname === '/mypage') {
      setDataType(MypageData);
    } else if (location.pathname === '/team') {
      setDataType([]);
    } else if (location.pathname === '/avataradd') {
      setDataType(MypageData);
    }
  }, [location, leaderId]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      {loading ? <Loading /> : null}
      {menutype === 'team' ? (
        <ChannelNavModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          teamId={teamId}
        />
      ) : (
        <></>
      )}
      <NavContainer>
        <StyledNav>
          <StyledUl>
            {dataType.map((menu) => (
              <StyledLi key={menu.id}>
                <StyledLink
                  to={
                    !menu.modal &&
                    (menutype === 'team'
                      ? `team/${teamId}${menu.path}`
                      : `${menu.path}`)
                  }
                  onClick={menu.modal && openModal}
                >
                  <span>{menu.title}</span>
                </StyledLink>
              </StyledLi>
            ))}
          </StyledUl>
        </StyledNav>
      </NavContainer>
      {location.pathname.includes(`/team/${teamId}`) &&
      !location.pathname.includes('newValueOrUpdater') ? (
        <ChannelAddModal teamId={teamId} />
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Sidebar;
