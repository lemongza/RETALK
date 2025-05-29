// src/pages/Home/MainPage.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axioInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: fit-content;
  background: #052210;
  position: relative;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: #052210;
  z-index: 10;
`;

const RetalkLogo = styled.div`
  font-family: "Luckiest Guy";
  font-size: 2rem;
  color: #00c853;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 200px;
  text-align: end;
  padding-bottom: 5px;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
`;

const NavItem = styled.div`
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;

  &:hover {
    color: #00c853;
  }
`;

const LoginButton = styled.div`
  background: #00c853;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  color: white;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;

  &:hover {
    background: #00b248;
  }
`;

const Footer = styled.footer`
  font-family: "Pretendard";
  font-size: 1rem;
  color: #d9d9d9;
  position: absolute;
  bottom: 20px;
  left: 68px;
`;

const Container = styled.div`
  padding: 120px 5vw 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00c853;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;

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
  margin: 2rem auto 0;

  &:hover {
    background: #00b248;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export default function WritePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    bookTitle: "",
    bookAuthor: "",
    bookCategory: "",
    bookCover: "",
    startDate: "",
    maxMembers: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // startDate를 LocalDateTime 형식으로 변환
      const formattedStartDate = formData.startDate
        ? formData.startDate + ":00"
        : null;

      const response = await axios.post(
        "/meetings",
        {
          ...formData,
          startDate: formattedStartDate,
          maxMembers: parseInt(formData.maxMembers),
          isActive: true,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qaUB0ZXN0LmNvbSIsImlhdCI6MTc0ODUwNDY1NSwiZXhwIjoxNzQ4NTkxMDU1fQ.g5wNrZ6yJkudYSjKWtinpWjbqZ_iUp6DMfqVK8i_NiY",
          },
        }
      );

      console.log("모임 생성 성공:", response.data);
      navigate("/talk"); // TalkBoardPage로 이동
    } catch (error) {
      console.error("모임 생성 실패:", error.response?.data || error.message);
    }
  };

  return (
    <Wrapper>
      <Header>
        <RetalkLogo>RETALK</RetalkLogo>
        <NavGroup>
          <NavItem>Read</NavItem>
          <NavItem>Talk</NavItem>
          <LoginButton>Login</LoginButton>
        </NavGroup>
      </Header>

      <Container>
        <Title>모임을 만들어보세요.</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>제목</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="모임 제목을 입력하세요"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>책 제목</Label>
            <Input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="책 제목을 입력하세요"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>작가</Label>
            <Input
              type="text"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              placeholder="작가 이름을 입력하세요"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>책 카테고리</Label>
            <Input
              type="text"
              name="bookCategory"
              value={formData.bookCategory}
              onChange={handleChange}
              placeholder="책의 카테고리를 입력하세요"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>책 표지 이미지 URL</Label>
            <Input
              type="url"
              name="bookCover"
              value={formData.bookCover}
              onChange={handleChange}
              placeholder="책 표지 이미지 URL을 입력하세요"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>모임 일정</Label>
            <Input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>모집 인원</Label>
            <Input
              type="number"
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleChange}
              placeholder="최대 모집 인원을 입력하세요"
              min="2"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>모임 소개</Label>
            <TextArea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="모임에 대해 소개해주세요"
              required
            />
          </InputGroup>
          <Button type="submit">등록하기</Button>
        </Form>
      </Container>
      <Footer>
        <div>
          <b>Github 🔗</b>
        </div>
        <div>Developer @김민정 @장수원 @정혜영 @조은지 @최지우 @홍영준</div>
      </Footer>
    </Wrapper>
  );
}
