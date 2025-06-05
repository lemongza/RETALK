// src/pages/Read/WriteReviewPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #00c853;
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
  margin: 0 auto 2rem;
  display: block;

  &:hover {
    background: #00b248;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const BookPreview = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const Cover = styled.img`
  width: 100px;
  height: auto;
  border-radius: 4px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  width: 100%;
  margin-bottom: 1.5rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #00c853;
  }
`;

export default function WriteReviewPage() {
  const [searchTitle, setSearchTitle] = useState('');
  const [book, setBook] = useState(null);
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/books/search?title=${encodeURIComponent(searchTitle)}`);
      if (res.data.length > 0) {
        setBook(res.data[0]);
      } else {
        alert('책을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!book) return alert('책을 먼저 검색하고 선택하세요.');
    if (!review) return alert('리뷰 내용을 입력하세요.');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/books/review', {
        bookTitle: book.title,
        message: review
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('리뷰가 저장되었습니다.');
      navigate('/read');
    } catch (err) {
      console.error(err);
      alert('리뷰 저장 실패');
    }
  };

  return (
    <Container>
      <Title>책 리뷰 작성</Title>
      <Input
        type="text"
        placeholder="책 제목을 입력하세요"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <Button onClick={handleSearch}>책 검색</Button>

      {book && (
        <BookPreview>
          <Cover src={book.cover} alt="표지" />
          <BookInfo>
            <div><b>{book.title}</b></div>
            <div>{book.author}</div>
          </BookInfo>
        </BookPreview>
      )}

      <Textarea
        placeholder="리뷰 내용을 입력하세요 (최대 300자)"
        maxLength={300}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button onClick={handleSubmit}>리뷰 저장</Button>
    </Container>
  );
}