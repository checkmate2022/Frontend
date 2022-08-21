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
import { onScheduleAdd } from '../../api/teamschedule';
import moment from 'moment-timezone';

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

const ScheduleAdd = () => {
  const teamid = useRecoilValue(teamState);

  // 일정 정보
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [participantName, setParticipantName] = useState([]);
  const [scheduleDescription, setScheduleDescription] = useState('');

  // 시작과 끝 시간
  const [scheduleStartDate, setScheduleStartDate] = useState(new Date());
  const [scheduleEndDate, setScheduleEndDate] = useState(new Date());

  // DateTimeFormatter df = DateTimeFormatter.ofPattern("d-MMM-yyyy");
  // LocalDate  d1 = LocalDate.parse(date1, df);
  // LocalDate  d2 = LocalDate.parse(date2, df);

  // 일정 등록
  const onScheduleAddButton = () => {
    let namelist = [];
    participantName.map((member) => namelist.push(member.username));

    onScheduleAdd(
      scheduleName,
      scheduleDescription,
      moment.tz(scheduleStartDate, 'Asia/Seoul'),
      moment.tz(scheduleEndDate, 'Asia/Seoul'),
      scheduleType,
      // scheduleStartDate,
      // scheduleEndDate,
      namelist,
      teamid
    );
  };

  console.log();

  return (
    <Container>
      <h2>일정 등록</h2>
      <StyledInput
        placeholder='제목'
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      />

      <MemberSearchModal
        setMemberList={setParticipantName}
        memberList={participantName}
        type='schedule'
        teamid={teamid}
      />
      <RowContainer>
        <DropBox
          options={OPTIONS}
          defaultValue='BASIC'
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
        <PurpleButton text='등록' onClick={onScheduleAddButton} />
      </ButtonContainer>
    </Container>
  );
};

const OPTIONS = [
  { value: 'BASIC', name: '일정' },
  { value: 'CONFERENCE', name: '회의' },
];

export default ScheduleAdd;
