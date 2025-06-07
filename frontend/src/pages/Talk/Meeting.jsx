// src/pages/Talk/Meeting.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axioInstance";
import ChatComponent from "../../components/chat/ChatComponent";
import "react-calendar/dist/Calendar.css";
import Schedule from "./Meeting/Schedule";
import Notice from "./Meeting/Notice";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 120px 1rem 1rem;
  }
`;
const MainContent = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const SidebarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const MeetingTitle = styled.h1`
  color: #00c853;
  font-size: 1.5rem;
  padding: 0.8rem; // 패딩 줄여 높이 조정
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: start;
`;
const TabContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    margin-bottom: 1rem;
  }
`;
const Tab = styled.button`
  flex: 1;
  //padding: 0.75rem;
  background: ${(p) => (p.active ? "#00c853" : "rgba(255,255,255,0.1)")};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  //padding: 0.5rem;
  @media (max-width: 768px) {
    display: ${(p) => (p.visible ? "block" : "none")};
  }
`;
const BookInfo = styled.div`
  color: white;
  display: grid;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  position: relative;
`;

const HoverImage = styled.img`
  position: flex;
  top: 10.5rem;
  left: 10rem;
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  display: none;
`;

const BookTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.2rem; // 좁은 간격
  padding: 0; // 패딩 제거
  text-align: start;
  width: fit-content; // 너비 자동 조정
  cursor: pointer;
  &:hover + ${HoverImage} {
    display: block;
  }
`;
const BookAuthor = styled.p`
  color: #c4c4c4;
  font-size: 1rem;
  margin-top: 0.1rem; // 간격을 좁게 설정
  padding: 0; // 패딩 제거
  text-align: start;
  width: fit-content; // 너비 자동 조정
`;
const MemberList = styled.div`
  color: white;
  padding: 0.5rem;
`;
const MemberTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #00c853;
`;
const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  &.host {
    background: rgba(0, 200, 83, 0.1);
  }
`;
const MemberName = styled.span`
  color: ${(p) => (p.isHost ? "#00c853" : "white")};
`;
const ChatContainer = styled.div`
  flex: 3;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: grid;
  flex-direction: column;
`;
const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`;
const BottomSection = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
const BottomCard = styled.div`
  flex: 1;
  min-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
`;

export default function Meeting() {
  const { id } = useParams();
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("book");
  const [isHost, setIsHost] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const token = localStorage.getItem("token");

  // JWT에서 sub(이메일)만 파싱
  const parseJwt = (tk) => {
    try {
      const p = tk.split(".")[1];
      const json = atob(p.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(
        decodeURIComponent(
          json
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );
    } catch {
      return null;
    }
  };

  // SendBird용 userId: 이메일에 @나 .이 있으면 _로 치환
  const sbUserId = useMemo(
    () =>
      userEmail.includes("@") ? userEmail.replace(/[@.]/g, "_") : userEmail,
    [userEmail]
  );

  // 모임 데이터 로드
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const payload = parseJwt(token);
        if (payload?.sub) setUserEmail(payload.sub);

        const res = await axios.get(`/meetings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetingData(res.data);
        setIsHost(res.data.hostEmail === payload?.sub);
      } catch (err) {
        console.error("미팅 정보 로드 실패:", err);
        alert("미팅 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  if (loading)
    return (
      <Container>
        <div style={{ color: "white", textAlign: "center" }}>로딩 중...</div>
      </Container>
    );
  if (!meetingData)
    return (
      <Container>
        <div style={{ color: "white", textAlign: "center" }}>
          미팅 정보를 찾을 수 없습니다.
        </div>
      </Container>
    );

  return (
    <Container>
      <MainContent>
        <SidebarContainer>
          <MeetingTitle>{meetingData.title}</MeetingTitle>
          <Sidebar visible={activeTab === "book"}>
            <BookInfo>
              <BookTitle>{meetingData.bookTitle}</BookTitle>
              <HoverImage
                src={meetingData.bookCover}
                alt={meetingData.bookTitle}
              />
              <BookAuthor>{meetingData.bookAuthor}</BookAuthor>
            </BookInfo>
          </Sidebar>
          <Sidebar visible={activeTab === "members"}>
            <MemberList>
              <MemberTitle>
                참여자 목록 ({meetingData.participants?.length || 0}/
                {meetingData.maxMembers})
              </MemberTitle>
              <Member className="host">
                <MemberName isHost>{meetingData.hostNickname}</MemberName>
              </Member>
              {meetingData.participants?.map((m) => (
                <Member key={m.userId}>
                  <MemberName>{m.nickname}</MemberName>
                </Member>
              ))}
            </MemberList>
          </Sidebar>
        </SidebarContainer>
        <ChatContainer>
          <ChatHeader>{meetingData.title} 의 실시간 채팅</ChatHeader>
          <ChatComponent
            appId={process.env.REACT_APP_SENDBIRD_APP_ID}
            userId={sbUserId}
            channelName={`meeting_${meetingData.id}`}
          />
        </ChatContainer>
      </MainContent>
      <BottomSection>
        <BottomCard>
          <Schedule meetingId={meetingData.id} isHost={isHost} />
        </BottomCard>
        <BottomCard>
          <Notice meetingId={meetingData.id} isHost={isHost} />
        </BottomCard>
      </BottomSection>
    </Container>
  );
}
