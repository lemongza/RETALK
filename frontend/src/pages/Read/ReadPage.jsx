// src/pages/Read/ReadPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 100px; /* 헤더 높이만큼 패딩 */
  padding-bottom: 100px;
  min-height: 100vh;
  background: #052210;
  color: white;
  font-family: 'Pretendard';
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20vh;
  color: #ccc;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #00C853;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 20;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default function ReadPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // TODO: fetch review data from API
    // fetch('/api/books/review').then(res => res.json()).then(setReviews);
  }, []);

  const handleAddClick = () => {
    alert("리뷰 작성 폼을 여는 기능을 구현하세요.");
  };

  return (
    <PageWrapper>
      {reviews.length === 0 ? (
        <EmptyMessage>아직 작성된 리뷰가 없습니다.</EmptyMessage>
      ) : (
        <div> {/* TODO: 리뷰 목록 렌더링 */} </div>
      )}

      <AddButton onClick={handleAddClick}>＋</AddButton>
    </PageWrapper>
  );
}