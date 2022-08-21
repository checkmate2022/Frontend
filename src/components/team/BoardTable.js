import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import moment from 'moment';

const StyledTable = styled.table`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  border-spacing: 0;
`;

const StyledTd = styled.td`
  border-bottom: 1px solid ${colors.grey};
  padding: 0;
  font-size: 16px;
  padding: 10px 5px;
  font-weight: bold;
`;

const StyledBodyTd = styled.td`
  padding: 0;
  font-size: 16px;
  padding: 10px 5px;
  margin-top: 10px;
`;

const TitleBodyTd = styled(StyledBodyTd)`
  :hover {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${colors.purple};
  }
`;

function BoardTable({ data }) {
  const headersName = ['제목', '작성자', '작성일'];
  const navigate = useNavigate();

  // 게시글로 이동
  const onClickBoard = (item) => {
    navigate(`board/${item.boardSeq}`, { state: { item: item } });
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {headersName.map((item, index) => {
            return <StyledTd key={index}>{item}</StyledTd>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.boardSeq}>
            <TitleBodyTd onClick={() => onClickBoard(item)}>
              {item.title}
            </TitleBodyTd>
            <StyledBodyTd>{item.username}</StyledBodyTd>
            <StyledBodyTd>
              {moment(item.createDate).format('YYYY/MM/DD  HH:mm')}
            </StyledBodyTd>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default BoardTable;
