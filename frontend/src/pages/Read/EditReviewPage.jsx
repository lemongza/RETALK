// src/pages/Read/EditReviewPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 600px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  font-family: "Pretendard", sans-serif;

  &:focus {
    outline: none;
    border-color: #00c853;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #00c853;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 200px;
  margin-top: 1rem;

  &:hover {
    background: #00b248;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export default function EditReviewPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [initialLoaded, setInitialLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 초기화

    const fetchReview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/books/review/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
        setInitialLoaded(true);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/books/review/${id}`, { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/read');
    } catch (err) {
      console.error('리뷰 수정 실패:', err);
    }
  };

  return (
    <Container>
      <Title>리뷰 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={initialLoaded && message.trim() === '' ? '리뷰 내용을 수정해주세요' : ''}
          maxLength={300}
        />
        <Button type="submit">수정 완료</Button>
      </Form>
    </Container>
  );
}