import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 120px 5vw 5vw;
  background: #052210;
  min-height: 100vh;
  position: relative;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background: #fff;
  color: #000;
  padding: 1rem;
  border-radius: 10px;
  width: 360px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: #333;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const BookCover = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
`;

const BookDetails = styled.div`
  flex: 1;
`;

const BookTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const BookAuthor = styled.p`
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #555;
`;

const Message = styled.p`
  margin-top: 0.8rem;
  white-space: pre-wrap;
  font-style: italic;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'edit' ? '#00C853' : '#D32F2F')};
  color: #fff;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  color: #00C853;
  font-size: 2.4rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  z-index: 20;
`;

export default function ReadPage() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const currentUserNickname = localStorage.getItem('nickname');

  useEffect(() => {
    console.log('✅ 현재 사용자 닉네임:', currentUserNickname);

    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/books/review', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('📦 불러온 리뷰:', res.data);
        setReviews(res.data);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };

    fetchReviews();
  }, [currentUserNickname]);

  const goToWritePage = () => {
    navigate('/read/write');
  };

  const handleEdit = (reviewId) => {
    navigate(`/read/edit/${reviewId}`);
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/books/review/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
      } catch (err) {
        console.error('리뷰 삭제 실패:', err);
      }
    }
  };

  return (
    <Container>
      {reviews.length === 0 ? (
        <div style={{ color: 'white', textAlign: 'center' }}>아직 작성된 리뷰가 없습니다.</div>
      ) : (
        <CardWrapper>
          {reviews.map((review) => {
            console.log('👤 리뷰 작성자:', review.reviewerNickname);
            console.log('🧑 현재 사용자:', currentUserNickname);

            return (
              <ReviewCard key={review.reviewId}>
                <Header>
                  <span>{review.reviewerNickname}</span>
                  {review.reviewerNickname === currentUserNickname && (
                    <ButtonGroup>
                      <ActionButton variant="edit" onClick={() => handleEdit(review.reviewId)}>
                        수정
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(review.reviewId)}>
                        삭제
                      </ActionButton>
                    </ButtonGroup>
                  )}
                </Header>
                <BookInfo>
                  <BookCover src={review.bookCoverUrl} alt={review.bookTitle} />
                  <BookDetails>
                    <BookTitle>{review.bookTitle}</BookTitle>
                    <BookAuthor>{review.bookAuthor}</BookAuthor>
                  </BookDetails>
                </BookInfo>
                <Message>"{review.message}"</Message>
              </ReviewCard>
            );
          })}
        </CardWrapper>
      )}
      <AddButton onClick={goToWritePage}>+</AddButton>
    </Container>
  );
}