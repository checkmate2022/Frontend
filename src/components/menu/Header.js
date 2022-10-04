import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderData } from './HeaderData';
import { colors } from '../../styles/theme';
import { onLogout } from '../../api/auth';
import Sidebar from './Sidebar';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { menuState, teamState } from '../../store/userstore';

const Container = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid ${colors.grey};
  background-color: ${colors.white};
  z-index: 80;
`;

const NavContainer = styled.div`
  display: flex;
  width: 95%;
  max-width: 1100px;
  height: 100%;
  margin: 0 0 0 4%;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
`;

const StyledLi = styled.li`
  margin-left: 30px;
  font-size: 18px;
`;

const TextButton = styled.a`
  cursor: pointer;
  position: absolute;
  right: 5%;
  z-index: 999;
`;

function Header() {
  const [type, setType] = useRecoilState(menuState);

  const onChange = (menuType) => {
    setType(menuType);
  };

  const resetTeamState = useResetRecoilState(teamState);
  const resetMenuState = useResetRecoilState(menuState);

  const onLoginButton = () => {
    resetTeamState();
    resetMenuState();
    onLogout();
  };

  return (
    <Container>
      <Sidebar menutype={type} />
      <NavContainer>
        <div>
          <StyledLink to={'/main'}>
            <h2>AvaTwin</h2>
          </StyledLink>
        </div>
        <nav>
          <StyledUl>
            {HeaderData.map((menu) => (
              <StyledLi key={menu.id} onClick={() => onChange(menu.type)}>
                <StyledLink to={menu.path}>
                  <span>{menu.title}</span>
                </StyledLink>
              </StyledLi>
            ))}
          </StyledUl>
        </nav>
        <TextButton onClick={onLoginButton}>로그아웃</TextButton>
      </NavContainer>
    </Container>
  );
}

export default Header;
