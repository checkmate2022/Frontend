import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

function CalendarDate({ scheduleList }) {
  console.log(scheduleList);
  return (
    <Container>
      {scheduleList.map((item) => {
        <></>;
      })}
    </Container>
  );
}

export default CalendarDate;
