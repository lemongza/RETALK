import React, { useEffect, useState } from "react";
import axios from "../../../api/axioInstance";
import styled from "styled-components";

export default function Notice({ meetingId, isHost }) {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`/meetings/${meetingId}/notices`);
      setNotices(res.data);
    } catch (err) {
      console.error("공지사항 조회 실패:", err);
    }
  };

  const handleSubmit = async () => {
    if (!newNotice.title) {
      alert("제목을 입력해주세요.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/meetings/${meetingId}/notices`, newNotice, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewNotice({ title: "", content: "" });
      fetchNotices();
    } catch (err) {
      console.error("공지사항 저장 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/meetings/${meetingId}/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotices();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Container>
      <NoticeListSection>
        <NoticeTitle>공지사항</NoticeTitle>
        <NoticeList>
          {notices.length === 0 ? (
            <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>
          ) : (
            notices.map((notice) => (
              <NoticeItem key={notice.id}>
                <strong>{notice.title}</strong>
                <p>{notice.content}</p>
                {isHost && (
                  <div className="actions">
                    <button onClick={() => handleDelete(notice.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </NoticeItem>
            ))
          )}
        </NoticeList>
      </NoticeListSection>

      <NoticeFormSection>
        <NoticeTitle>공지사항 작성</NoticeTitle>
        <FormSection>
          <input
            type="text"
            placeholder="제목"
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
          />
          <textarea
            placeholder="내용"
            value={newNotice.content}
            onChange={(e) =>
              setNewNotice({ ...newNotice, content: e.target.value })
            }
          />
          <button onClick={handleSubmit}>공지 등록</button>
        </FormSection>
      </NoticeFormSection>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  display: flex;
  grid-template-columns: 1fr ${(props) => (props.isHost ? "380px" : "0")};
  gap: 2rem;
  height: 100%;
`;

const NoticeListSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const NoticeFormSection = styled.div`
  width: 380px;
`;

const FormSection = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  input,
  textarea {
    padding: 0.7rem;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }

  button {
    width: 100%;
    padding: 0.7rem;
    background: #00c853;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: #00b248;
    }
  }
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const NoticeItem = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);

  strong {
    font-size: 1.2rem;
    color: #00c853;
    display: block;
    margin-bottom: 0.5rem;
  }

  p {
    color: #fff;
    line-height: 1.6;
    margin: 0.5rem 0;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;

    button {
      padding: 0.5rem 1rem;
      background: #555;
      border: none;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background: #666;
      }
    }
  }
`;

const NoticeTitle = styled.h3`
  font-size: 1.2rem;
  color: #00c853;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmptyMessage = styled.div`
  color: #888;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;
