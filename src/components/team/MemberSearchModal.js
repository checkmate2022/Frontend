import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { colors } from '../../styles/theme';
import { onTeamMemberGet, onUserInfoGet } from '../../api/team';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const SearchButton = styled.button`
  width: 66px;
  height: 46px;
  background: ${colors.grey3};
  border: none;
  border-radius: 48px;
  cursor: pointer;
  position: absolute;
  margin: 0 5px 1% 0;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledInput = styled.input`
  position: relative;
  width: 60%;
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: fit-content;
`;

const MemberText = styled.span`
  cursor: pointer;
  margin-bottom: 3%;
`;

const DeleteText = styled.span`
  cursor: pointer;
  position: absolute;
  margin: 1% 1.5% 1% 0;
`;

function MemberSearchModal({ memberList, setMemberList, type, teamid }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [teamMember, setTeamMember] = useState('');

  // 검색 결과 리스트
  const [list, setList] = useState([]);

  const openModal = () => {
    setIsOpen(true);
    onSearch();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 검색
  const onSearch = () => {
    if (type === 'user') {
      onUserInfoGet(setList, teamMember);
    } else if (type === 'schedule') {
      onTeamMemberGet(setList, teamid);
    }
  };

  // 검색 회원 선택
  const onMemberClick = (member) => {
    // 같은 아이디면 안넣기
    let seqlist = [];
    memberList.map((member) => seqlist.push(member.userSeq));
    if (!seqlist.includes(member.userSeq)) {
      setMemberList([...memberList, member]);
    }

    setIsOpen(false);
  };

  // 회원 목록에서 삭제
  const onRemove = (id) => {
    setMemberList(memberList.filter((member) => member.userSeq !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <StyledInput
          placeholder='참여자'
          value={teamMember}
          onChange={(e) => setTeamMember(e.target.value)}
        />
        <SearchContainer>
          <SearchButton onClick={openModal}>검색</SearchButton>
        </SearchContainer>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <ModalContainer>
            <h2>회원 선택</h2>
            {list.map((member) => (
              <MemberText
                key={member.userSeq}
                onClick={() => onMemberClick(member)}
              >
                {member.username}({member.userId})
              </MemberText>
            ))}
          </ModalContainer>
        </Modal>
      </div>
      {memberList.map((member) => (
        <div style={{ display: 'flex' }} key={member.userSeq}>
          <StyledInput
            defaultValue={`${member.username}(${member.userId})`}
            disabled={true}
          />
          <SearchContainer>
            <DeleteText onClick={() => onRemove(member.userSeq)}>✖</DeleteText>
          </SearchContainer>
        </div>
      ))}
    </div>
  );
}

export default MemberSearchModal;
