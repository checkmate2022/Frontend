import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import {
  Datepicker,
  DropBox,
  MemberSearchModal,
  PurpleButton,
} from '../../components';
import { useRecoilValue } from 'recoil';
import { teamState } from '../../store/userstore';
import 'react-datepicker/dist/react-datepicker.css';
import { onScheduleChange, onScheduleDelete } from '../../api/teamschedule';
import { useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import 'moment/locale/ko';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 9% 0 3% 10%;
  width: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  width: 63%;
  justify-content: flex-end;
`;

const StyledInput = styled.input`
  width: ${({ typestyle }) => (typestyle === 'date' ? 'fit-content' : '60%')};
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 12px;
  margin: 0 5px 1% 0;
  cursor: ${({ typestyle }) => (typestyle === 'date' ? 'pointer' : 'auto')};

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const StyledTextArea = styled.textarea`
  width: 60%;
  height: 150px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 25px;
  font-size: 14px;
  padding: 1.3%;
  resize: none;
  overflow: hidden;
  margin-top: 10px;
  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.span`
  width: 3%;
  font-size: 25px;
`;

const ScheduleSetting = () => {
  const teamId = useRecoilValue(teamState);
  const offset = new Date().getTimezoneOffset() * 60000;

  // 일정 정보 가져오기
  const location = useLocation();
  const schedule = location.state;

  // 일정 정보
  const [scheduleName, setScheduleName] = useState(schedule.scheduleName);
  const [scheduleType, setScheduleType] = useState(schedule.scheduleType);
  const [participantName, setParticipantName] = useState([]);
  const [scheduleDescription, setScheduleDescription] = useState(
    schedule.scheduleDescription
  );

  // 시작과 끝 시간
  const [scheduleStartDate, setScheduleStartDate] = useState(
    new Date(schedule.scheduleStartDate)
  );
  const [scheduleEndDate, setScheduleEndDate] = useState(
    new Date(schedule.scheduleEndDate)
  );

  // 일정 수정
  const onScheduleChangeButton = () => {
    let namelist = [];
    participantName.map((member) => namelist.push(member.username));

    onScheduleChange(
      scheduleName,
      scheduleDescription,
      moment.tz(new Date(scheduleStartDate - offset), 'Asia/Seoul'),
      moment.tz(new Date(scheduleEndDate - offset), 'Asia/Seoul'),
      scheduleType,
      namelist,
      teamId,
      schedule.scheduleSeq
    );
  };

  // 일정 삭제
  const onScheduleDeleteButton = () => {
    onScheduleDelete(teamId, schedule.scheduleSeq);
  };

  return (
    <Container>
      <h2>일정 변경</h2>
      <StyledInput
        placeholder='제목'
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      />

      <MemberSearchModal
        setMemberList={setParticipantName}
        memberList={participantName}
        type='schedule'
        teamid={teamId}
      />
      <RowContainer>
        <DropBox
          options={OPTIONS}
          defaultValue='DEFAULT'
          setState={setScheduleType}
          board={false}
        />
        <div style={{ marginRight: '10px' }} />
        <Datepicker
          selected={scheduleStartDate}
          onChange={(date) => setScheduleStartDate(date)}
          customInput={<StyledInput typestyle='date' />}
        />
        <div style={{ marginRight: '10px' }} />
        <TitleText>~</TitleText>
        <Datepicker
          selected={scheduleEndDate}
          onChange={(date) => setScheduleEndDate(date)}
          customInput={<StyledInput typestyle='date' />}
        />
      </RowContainer>
      <StyledTextArea
        type='text'
        placeholder='내용'
        value={scheduleDescription}
        maxLength={400}
        onChange={(e) => setScheduleDescription(e.target.value)}
      />
      <ButtonContainer>
        <PurpleButton text='수정' onClick={onScheduleChangeButton} />
        <div style={{ width: '10px' }} />
        <PurpleButton text='삭제' onClick={onScheduleDeleteButton} />
      </ButtonContainer>
    </Container>
  );
};

const OPTIONS = [
  { value: 'BASIC', name: '일정' },
  { value: 'CONFERENCE', name: '회의' },
];

export default ScheduleSetting;
