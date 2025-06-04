import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 100px 5vw 40px;
  background: #052210;
  min-height: 100vh;
  color: white;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: #00C853;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
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
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  resize: none;
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