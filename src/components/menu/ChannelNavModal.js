import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { onChannelGet } from '../../api/teamboard';
import { useSetRecoilState } from 'recoil';
import { channelState } from '../../store/boardstore';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '40%',
    left: '20%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
`;

const StyledNav = styled.nav`
  display: flex;
`;

const StyledSpan = styled.span`
  color: black;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li`
  margin-bottom: 17px;
`;

function ChannelNavModal({ teamId, modalIsOpen, setIsOpen }) {
  //const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [channelList, setChannelList] = useState([]);
  const setChannelName = useSetRecoilState(channelState);

  // 팀별 게시판 조회
  useEffect(() => {
    onChannelGet(teamId, setChannelList);
    console.log(channelList);
  }, [teamId]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <ModalContainer>
            <StyledNav>
              <StyledUl>
                {channelList.map((channel) => (
                  <StyledLi key={channel.channelSeq}>
                    <StyledSpan
                      onClick={() => {
                        navigate(
                          `/team/${teamId}/teamchannel/${channel.channelSeq}`
                        );
                        closeModal();
                        setChannelName(channel.channelName);
                      }}
                    >
                      {channel.channelName}
                    </StyledSpan>
                  </StyledLi>
                ))}
              </StyledUl>
            </StyledNav>
          </ModalContainer>
        </Modal>
      </div>
    </div>
  );
}

export default ChannelNavModal;
