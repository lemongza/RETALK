import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 120px 5vw 5vw;
  background: #052210;
  min-height: 100vh;
  color: white;
  font-family: 'Pretendard', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  font-family: 'Pretendard', sans-serif;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #00c853;
  color: white;
  cursor: pointer;
  align-self: flex-end;
`;

export default function EditReviewPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/books/review/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
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
        <Label htmlFor="message">리뷰 내용</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">수정 완료</Button>
      </Form>
    </Container>
  );
}