import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MypageData, TeamData } from './SidebarData';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { useRecoilValue } from 'recoil';
import { menuState, teamState } from '../../store/counter';

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
  const teamid = useRecoilValue(teamState);
  const menutype = useRecoilValue(menuState);

  const [dataType, setDataType] = useState([]);

  useEffect(() => {
    if (menutype === 'mypage') {
      setDataType(MypageData);
    } else if (menutype === 'team') {
      setDataType(TeamData);
    } else {
      setDataType([]);
    }
  }, [menutype]);

  return (
    <Container>
      <NavContainer>
        <StyledNav>
          <StyledUl>
            {dataType.map((menu) => (
              <StyledLi key={menu.id}>
                <StyledLink to={`${menu.path}/${teamid}`}>
                  <span>{menu.title}</span>
                </StyledLink>
              </StyledLi>
            ))}
          </StyledUl>
        </StyledNav>
      </NavContainer>
    </Container>
  );
}

export default Sidebar;
