import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  padding: 120px 10%;
  font-family: "Pretendard";
  color: white;
`;

const Title = styled.h1`
  color: #00c853;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  background-color: #1e1e1e;
  color: #00c853;
  text-align: left;
  border-bottom: 1px solid #444;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #333;
`;

const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  color: white;
  background-color: ${(props) => (props.active ? "#00c853" : "#444")};
  border: 1px solid #888;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00e676;
  }
`;

export default function AdminPage() {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();
    window.scrollTo(0, 0);
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/admin/meetings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeetings(res.data);
    } catch (err) {
      console.error("모임 목록 조회 실패:", err);
      alert("접근 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말로 이 모임을 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/meetings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("삭제되었습니다.");
      fetchMeetings();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleToggleChat = async (id, enable) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = enable
        ? `http://localhost:8080/admin/meetings/${id}/chat-on`
        : `http://localhost:8080/admin/meetings/${id}/chat-off`;

      await axios.patch(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMeetings();
    } catch (err) {
      console.error("채팅 상태 변경 실패:", err);
      alert("채팅 상태 변경에 실패했습니다.");
    }
  };

  const handleEnter = (id) => {
    navigate(`/talk/meeting/${id}`);
  };

  return (
    <PageWrapper>
      <Title>전체 모임 목록 (관리자)</Title>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>제목</Th>
            <Th>책 제목</Th>
            <Th>호스트</Th>
            <Th>날짜</Th>
            <Th>채팅</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <Td>{meeting.id}</Td>
              <Td>{meeting.title}</Td>
              <Td>{meeting.bookTitle}</Td>
              <Td>{meeting.hostNickname}</Td>
              <Td>{new Date(meeting.startDate).toLocaleString()}</Td>
              <Td>
                <ActionButton
                  active={meeting.chatEnabled}
                  onClick={() => handleToggleChat(meeting.id, true)}
                >
                  채팅 ON
                </ActionButton>
                <ActionButton
                  active={!meeting.chatEnabled}
                  onClick={() => handleToggleChat(meeting.id, false)}
                >
                  채팅 OFF
                </ActionButton>
              </Td>
              <Td>
                <ActionButton onClick={() => handleEnter(meeting.id)}>
                  입장
                </ActionButton>
                <ActionButton onClick={() => handleDelete(meeting.id)}>
                  삭제
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageWrapper>
  );
}