import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { PurpleButton } from '../../components';
import { useRecoilValue } from 'recoil';
import { teamState } from '../../store/userstore';
import 'react-datepicker/dist/react-datepicker.css';
import { onScheduleGet, onScheduleDelete } from '../../api/teamschedule';
import moment from 'moment-timezone';
import 'moment/locale/ko';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '7px',
    width: '40%',
  },
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin: 10px 0 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3%;
  justify-content: flex-end;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const TitleText = styled.span`
  width: 3%;
  font-size: 25px;
`;

const ScheduleContainer = styled.div`
  margin: 10px;
  padding: 30px;
`;

const ScheduleDetail = ({ scheduleId, modalIsOpen, setIsOpen }) => {
  const teamid = useRecoilValue(teamState);
  const navigate = useNavigate();

  // 일정 리스트
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    onScheduleGet(scheduleId, setSchedule);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(schedule);

  // 일정 수정 페이지로
  const ScheduleChangePage = () => {
    navigate(`/team/${teamid}/dashboard/${scheduleId}`, { state: schedule });
  };

  // 일정 삭제
  const ScheduleDelete = (id) => {
    onScheduleDelete(teamid, id);
  };

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <h1>일정</h1>
          {schedule !== undefined && (
            <ScheduleContainer>
              <div key={schedule.scheduleSeq}>
                <span>{schedule.scheduleName}</span>
                <RowContainer>
                  <span>참여자: </span>
                  <span> jamong, melon</span>
                </RowContainer>
                <RowContainer>
                  <span>기간: </span>
                  <span>{schedule.scheduleStartDate}</span>
                </RowContainer>
                <ButtonContainer>
                  <PurpleButton text='수정' onClick={ScheduleChangePage} />
                  <div style={{ width: '10px' }} />
                  <PurpleButton
                    text='삭제'
                    onClick={() => ScheduleDelete(schedule.scheduleSeq)}
                  />
                </ButtonContainer>
                <hr
                  style={{
                    borderTop: '1px',
                    width: '100%',
                    borderColor: 'grey',
                    marginTop: '30px',
                  }}
                />
              </div>
            </ScheduleContainer>
          )}
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default ScheduleDetail;
