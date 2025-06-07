// src/pages/Talk/Meeting.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../../api/axioInstance";
import ChatComponent from "../../../components/chat/ChatComponent";
import "react-calendar/dist/Calendar.css";
import Schedule from "./Schedule";
import Notice from "./Notice";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  padding: 0.75rem;
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
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 1.5rem;
  @media (max-width: 768px) {
    display: ${(p) => (p.visible ? "block" : "none")};
  }
`;
const BookInfo = styled.div` color: white; `;
const BookCover = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;
const BookTitle = styled.h2` font-size: 1.5rem; margin-bottom: 0.5rem; `;
const BookAuthor = styled.p`
  color: #c4c4c4;
  font-size: 1rem;
  margin-bottom: 1rem;
`;
const MemberList = styled.div` color: white; `;
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
  background: rgba(255,255,255,0.05);
  &.host { background: rgba(0,200,83,0.1); }
`;
const MemberName = styled.span` color: ${(p) => (p.isHost ? "#00c853" : "white")}; `;
const ChatContainer = styled.div`
  flex: 1;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: white;
`;
const BottomSection = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
  @media (max-width:1200px) { grid-template-columns: 1fr; }
`;
const BottomCard = styled.div`
  flex: 1;
  min-width: 300px;
  background: rgba(255,255,255,0.1);
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
            .map((c) =>
              "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
            )
            .join("")
        )
      );
    } catch {
      return null;
    }
  };

  // SendBird용 userId: 이메일에 @나 .이 있으면 _로 치환
  const sbUserId = useMemo(
    () => (userEmail.includes("@") ? userEmail.replace(/[@.]/g, "_") : userEmail),
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
          <TabContainer>
            <Tab
              active={activeTab === "book"}
              onClick={() => setActiveTab("book")}
            >
              책 정보
            </Tab>
            <Tab
              active={activeTab === "members"}
              onClick={() => setActiveTab("members")}
            >
              참여자 목록
            </Tab>
          </TabContainer>
          <Sidebar visible={activeTab === "book"}>
            <BookInfo>
              <BookCover
                src={meetingData.bookCover}
                alt={meetingData.bookTitle}
              />
              <BookTitle>{meetingData.bookTitle}</BookTitle>
              <BookAuthor>{meetingData.bookAuthor}</BookAuthor>
            </BookInfo>
          </Sidebar>
          <Sidebar visible={activeTab === "members"}>
            <MemberList>
              <MemberTitle>
                참여자 목록 (
                {meetingData.participants?.length || 0}/{meetingData.maxMembers}
                )
              </MemberTitle>
              <Member className="host">
                <MemberName isHost>
                  {meetingData.hostNickname}
                </MemberName>
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
          <ChatHeader>
            실시간 채팅 – {meetingData.title}
          </ChatHeader>
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
          <Notice isHost={isHost} />
        </BottomCard>
      </BottomSection>
    </Container>
  );
}
