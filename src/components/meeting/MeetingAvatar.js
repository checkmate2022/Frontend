import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';
import { onAvatarAllGet } from '../../api/avatar';

const Container = styled.div`
  width: 260px;
  height: 300px;
  background: ${colors.purple};
  opacity: 0.7;
  border-radius: 48px;
  display: flex;
  flex-direction: column;
  margin: 15px 15px 25px 15px;
  cursor: pointer;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${Container} {
    background: ${colors.lightpurple};
    color: ${colors.white};
  }
  display: none;
`;

const StyledText = styled.span`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 2%;
`;

const NameText = styled.span`
  color: ${colors.white};
  font-size: 25px;
  font-weight: 400;
  margin-left: 5%;
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 15% 0 0 8%;
`;

const DetailContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  margin: 7% 0 0 8%;
`;

function MeetingAvatar({ avatarList, checkedvalue, onChange }) {
  console.log(checkedvalue);
  return (
    <div style={{ display: 'flex' }}>
      {avatarList.map((item) => (
        <label key={item.avatarSeq}>
          <RadioButton
            type='radio'
            value={item.avatarName}
            checked={checkedvalue === item.avatarName}
            onChange={onChange}
          />
          <Container>
            <ImgContainer>
              <StyledImg src={item.avatarCreatedUrl} />
              <NameText>{item.avatarName}</NameText>
            </ImgContainer>
            <DetailContainer>
              <StyledText>
                생성날짜: {moment(item.avatarDate).format('YYYY-MM-DD HH:mm')}
              </StyledText>
              <StyledText>캐릭터 설명: {item.avatarDescription}</StyledText>
            </DetailContainer>
          </Container>
        </label>
      ))}
    </div>
  );
}

export default MeetingAvatar;
