import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { PurpleButton } from '../../components/index';
import { useRecoilValue } from 'recoil';
import { teamState } from '../../store/counter';
import { onTeamScheduleGet } from '../../api/teamschedule';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 8% 0 3% 15%;
`;

const TitleText = styled.h5`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 85%;
  justify-content: flex-end;
  align-items: flex-end;
`;

const TeamDashboard = () => {
  const teamid = useRecoilValue(teamState);

  const navigate = useNavigate();

  const [scheduleList, setScheduleList] = useState([]);

  // 회의/일정 등록 페이지 이동
  const onScheduleAddPage = () => {
    window.location.href = `dashboard/scheduleadd`;
  };

  // 화상회의 바로 시작
  const onMeetingStartButton = () => {};

  // 일정 불러오기
  useEffect(() => {
    onTeamScheduleGet(teamid, setScheduleList);
  }, []);

  console.log(scheduleList);

  return (
    <Container>
      <ButtonContainer>
        <PurpleButton text='화상회의 시작' onClick={onMeetingStartButton} />
        <div style={{ width: '10px' }} />
        <PurpleButton text='회의 / 일정 등록' onClick={onScheduleAddPage} />
      </ButtonContainer>
      <TitleText>회의실</TitleText>
      {scheduleList.map((item) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() =>
            navigate(`${item.scheduleSeq}`, { state: { item: item } })
          }
        >
          {item.scheduleName}{' '}
          {moment(item.scheduleStartDate).format('YYYY년 MM월 DD일 HH:mm')}
        </span>
      ))}
      <TitleText>일정</TitleText>
      <ReactCalendar />
    </Container>
  );
};

export default TeamDashboard;
