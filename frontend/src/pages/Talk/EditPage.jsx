// src/pages/Home/MainPage.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axioInstance";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  TopBar,
  Input,
  Select,
  TitleInput,
  BackButton,
  Form,
  InputRow,
  InputGroup,
  Label,
  TextArea,
  Button,
} from "../../components/common/Form";

export default function EditPage() {
  console.log("WritePage loaded");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    //스크롤바 상단으로 초기화
    window.scrollTo(0, 0);
  }, []);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    if (id) {
      const fetchMeeting = async () => {
        try {
          const response = await axios.get(`/meetings/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data;
          setFormData({
            title: data.title,
            bookTitle: data.bookTitle,
            bookAuthor: data.bookAuthor,
            bookCategory: data.bookCategory,
            bookCover: data.bookCover,
            startDate: data.startDate?.split("T")[0] || "",
            maxMembers: data.maxMembers.toString(),
            description: data.description,
          });
        } catch (error) {
          console.error(
            "모임 정보 불러오기 실패:",
            error.response?.data || error.message
          );
        }
      };

      fetchMeeting();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = formData.startDate
      ? formData.startDate + "T00:00:00"
      : null;

    const payload = {
      ...formData,
      startDate: formattedStartDate,
      maxMembers: parseInt(formData.maxMembers),
      description: formData.description,
      active: true,
    };

    try {
      let response;
      if (id) {
        response = await axios.put(`/meetings/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(`/meetings`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      console.log("모임 저장 성공:", response.data);
      navigate("/talk");
    } catch (error) {
      console.error("모임 저장 실패:", error.response?.data || error.message);
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
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="모임에 대해 소개해주세요"
              required
            />
          </InputGroup>

          <Button type="submit" onClick={handleSubmit}>
            수정하기
          </Button>
        </Form>
      </Container>
    </div>
  );
}
