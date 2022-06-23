import React, { useState, useEffect } from 'react';
import { AvatarType, GreyLabel } from '../../components';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { onAvatarAllGet, onAvatarDelete } from '../../api/avatar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 11% 0 3% 6%;
  width: 65%;
`;

const TypeContainer = styled.div`
  display: flex;
`;

const NumText = styled.span`
  fontsize: 13px;
`;

const NumContainer = styled.div`
  display: flex;
  margin-bottom: 2%;
  justify-content: flex-end;
  width: 100%;
`;

const AvatarSetting = () => {
  const [avatarList, setAvatarList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    onAvatarAllGet(setAvatarList);
    console.log(avatarList.length);
    if (avatarList.length > 2) {
      setIsAdd(false);
    } else {
      setIsAdd(true);
    }
  }, [avatarList.length]);

  return (
    <Container>
      <NumContainer>
        <NumText>{avatarList.length}/3</NumText>
      </NumContainer>
      <TypeContainer>
        <AvatarType avatar={avatarList} add={isAdd} />
      </TypeContainer>
    </Container>
  );
};

export default AvatarSetting;
