import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import {
  PurpleButton,
  JoinMeetingModal,
  ScheduleDetail,
  CalendarDate,
} from '../../components/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { teamState, userState } from '../../store/userstore';
import { onTeamScheduleGet } from '../../api/teamschedule';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import '../../components/team/Calendar.css';
import { checkafternow, formatDay } from '../../module/time';
import { meetingState } from '../../store/meetingstore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 7% 0 3% 15%;
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

const AbsoluteContainer = styled.div`
  position: absolute;
  margin: 1% 0 0 3%;
`;

const TeamDashboard = () => {
  const teamid = useRecoilValue(teamState);
  const setMeeting = useSetRecoilState(meetingState);

  const navigate = useNavigate();

  const [scheduleList, setScheduleList] = useState([]);
  const [nowList, setNowList] = useState([]);
  const [dateList, setDateList] = useState([]);

  // 회의 설정 모달
  const [modalIsOpen, setIsOpen] = useState(false);

  // 일정 상세 모달
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);

  // 선택 날짜
  const [selectedDate, setSelectedDate] = useState('');

  const openModal = (item) => {
    setIsOpen(true);
    setMeeting(item);
  };

  // 일정 상세 모달
  const openDetailModal = (item) => {
    setDetailModalIsOpen(true);
    setSelectedDate(item);
  };

  // 회의/일정 등록 페이지 이동
  const onScheduleAddPage = () => {
    window.location.href = `/team/${teamid}/dashboard/scheduleadd`;
  };

  // 화상회의 바로 시작
  const onMeetingStartButton = () => {
    //onCreateSession(234980);
    window.location.href = `/team/${teamid}/meeting/234980`;
    //navigate(`/team/${teamid}/meeting/234980`);
  };

  // 일정 불러오기
  useEffect(() => {
    onTeamScheduleGet(teamid, setScheduleList);
  }, []);

  useEffect(() => {
    onCheckTime();

    // 오늘 일정 가져오기
    let list = [];

    scheduleList.map((item) => {
      if (
        moment(item.scheduleStartDate).format('YYYY-MM-DD') ===
        moment(new Date()).format('YYYY-MM-DD')
      ) {
        list.push(item);
      }
    });

    setDateList(list);
  }, [scheduleList]);

  // 현재 시간 이후 회의 일정만 보여주기
  const onCheckTime = () => {
    let list = [];

    scheduleList.map((item) => {
      if (checkafternow(item.scheduleStartDate)) {
        if (item.scheduleType === 'CONFERENCE') {
          list.push(item);
        }
      }
    });
    setNowList(list);
  };

  // 회의 입장(회의 설정 모달 열기)
  const onMeetingEnterButton = () => {};

  return (
    <Container>
      <ButtonContainer>
        <PurpleButton text='화상회의 시작' onClick={onMeetingStartButton} />
        <div style={{ width: '10px' }} />
        <PurpleButton text='회의 / 일정 등록' onClick={onScheduleAddPage} />
      </ButtonContainer>
      <TitleText>회의실</TitleText>
      {nowList.map((item) => (
        <span
          style={{ cursor: 'pointer', width: 'fit-content' }}
          onClick={() => openModal(item)}
          key={item.scheduleSeq}
        >
          {item.scheduleName + '  '}
          {moment(item.scheduleStartDate).format('YYYY년 MM월 DD일 HH:mm')}
        </span>
      ))}
      {modalIsOpen ? (
        <JoinMeetingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      ) : null}
      <TitleText>일정</TitleText>
      <ReactCalendar
        showNeighboringMonth={false}
        formatDay={(locale, date) => formatDay(date)}
        minDetail='month' // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail='month' // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        onChange={(e) => setSelectedDate(moment(e).format('YYYY-MM-DD'))}
        tileContent={({ date, view }) => {
          let html = [];
          let check = scheduleList.filter(
            (x) =>
              moment(x.scheduleStartDate).format('YYYY-MM-DD') ===
              moment(date).format('YYYY-MM-DD')
          );

          check.map((item) => {
            html.push(
              <div
                key={item.scheduleSeq}
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => openDetailModal(item.scheduleSeq)}
              >
                {item.scheduleName}
              </div>
            );
          });

          if (check !== []) {
            return (
              <>
                <AbsoluteContainer>{html}</AbsoluteContainer>
              </>
            );
          }
        }}
      />
      {detailModalIsOpen ? (
        <ScheduleDetail
          scheduleId={selectedDate}
          modalIsOpen={detailModalIsOpen}
          setIsOpen={setDetailModalIsOpen}
        />
      ) : null}
    </Container>
  );
};

export default TeamDashboard;
