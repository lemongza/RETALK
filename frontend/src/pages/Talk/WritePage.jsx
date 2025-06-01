// src/pages/Home/MainPage.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axioInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: rem;
    color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const TopBar = styled.div`
  display: flex;

  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  /* background: rgba(255, 255, 255, 0.05); */
  /* padding: 1rem; */
  border-radius: 8px;
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
    border-bottom-color: #00c853;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
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
`;

const TitleInput = styled.input`
  width: 80%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: white;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-bottom-color: #00c853;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
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
  flex: 1;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Label = styled.label`
  color: #c4c4c4;
  font-size: 0.9rem;
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
  console.log("WritePage loaded");
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
        ? formData.startDate + "T00:00:00"
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
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qaUB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQ4NzAzMDcxLCJleHAiOjE3NDg3ODk0NzF9.4rOaZ_ajs3DOl-CuLKF5qSD-t7hvRakQE3kUqQCuB5o",
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
    <div>
      <Container>
        <TopBar>
          {/* <Label>제목</Label> */}
          <TitleInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
          <BackButton type="button" onClick={() => navigate(-1)}>
            돌아가기
          </BackButton>
        </TopBar>

        <Form onSubmit={handleSubmit}>
          <InputRow>
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
          </InputRow>
          <InputRow>
            <InputGroup>
              <Label>책 카테고리</Label>
              <Select
                name="bookCategory"
                value={formData.bookCategory}
                onChange={handleChange}
                required
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="소설">소설</option>
                <option value="시/에세이">시/에세이</option>
                <option value="인문">인문</option>
                <option value="가정/육아">가정/육아</option>
                <option value="요리">요리</option>
                <option value="건강">건강</option>
                <option value="취미/실용/스포츠">취미/실용/스포츠</option>
                <option value="경제/경영">경제/경영</option>
                <option value="자기계발">자기계발</option>
                <option value="정치/사회">정치/사회</option>
                <option value="종교">종교</option>
                <option value="예술/대중문화">예술/대중문화</option>
                <option value="중/고등참고서">중/고등참고서</option>
                <option value="기술/공학">기술/공학</option>
                <option value="외국어">외국어</option>
                <option value="과학">과학</option>
                <option value="취업/수험서">취업/수험서</option>
                <option value="여행">여행</option>
                <option value="컴퓨터/IT">컴퓨터/IT</option>
                <option value="잡지">잡지</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>책 표지</Label>
              <Input
                type="url"
                name="bookCover"
                value={formData.bookCover}
                onChange={handleChange}
                placeholder="책 표지 이미지 URL을 입력하세요"
                required
              />
            </InputGroup>
          </InputRow>
          <InputRow>
            <InputGroup>
              <Label>모임 시작일</Label>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 10)}
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
          </InputRow>
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
    </div>
  );
}
