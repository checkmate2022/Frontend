import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  padding: 1px;
  color: ${({ isSelected }) => (isSelected ? colors.purple : 'grey')};
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  margin: 4px;
  border-radius: 5px;
  width: 25px;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${colors.purple};
  }
  &:focus::after {
    color: white;
    background-color: ${colors.purple};
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const checkSelected = (number) => {
    if (number === currentPage) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <nav>
        {pageNumbers.map((number) => (
          <PageUl
            key={number}
            isSelected={checkSelected(number)}
            onClick={() => paginate(number)}
          >
            <PageLi>
              <span>{number}</span>
            </PageLi>
          </PageUl>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
