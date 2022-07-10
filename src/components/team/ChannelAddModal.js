import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { colors } from '../../styles/theme';
import PurpleButton from '../PurpleButton';
import { onChannelAdd } from '../../api/teamboard';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
  },
};

const StyledInput = styled.input`
  position: relative;
  width: 60%;
  height: 20px;
  opacity: 0.9;
  background: ${colors.white};
  border: 1px solid ${colors.grey2};
  border-radius: 48px;
  font-size: 14px;
  padding: 10px;
  margin: 0 0 0 20px;

  &:focus {
    outline: 0.3px solid ${colors.purple};
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: fit-content;
`;

const AddText = styled.span`
  cursor: pointer;
  margin-bottom: 3%;
`;

const ChannelAddContainer = styled.div`
  display: flex;
  margin-top: 10%;
  width: 63%;
  justify-content: flex-end;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
`;

function ChannelAddModal({ teamId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [channelName, setChannelName] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChannelAddButton = () => {
    onChannelAdd(teamId, channelName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <ChannelAddContainer>
          <AddText onClick={openModal}>+ 게시판 추가</AddText>
        </ChannelAddContainer>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <ModalContainer>
            <h2>게시판 추가</h2>
            <RowContainer>
              <span>게시판 이름</span>
              <StyledInput
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </RowContainer>

            <PurpleButton text='등록' onClick={onChannelAddButton} />
          </ModalContainer>
        </Modal>
      </div>
    </div>
  );
}

export default ChannelAddModal;
