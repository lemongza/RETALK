import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axioInstance";
import "react-calendar/dist/Calendar.css";
import Schedule from "./Meeting/Schedule";
import Notice from "./Meeting/Notice";
import ChatComponent from "./Meeting/ChatComponent";

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
  background: ${(props) =>
    props.active ? "#00c853" : "rgba(255, 255, 255, 0.1)"};
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
  padding: 1.5rem;

  @media (max-width: 768px) {
    display: ${(props) => (props.visible ? "block" : "none")};
  }
`;

const BookInfo = styled.div`
  color: white;
`;

const BookCover = styled.img`
  width: 100%;
  /* height: 300px; */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const BookTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const BookAuthor = styled.p`
  color: #c4c4c4;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const MemberList = styled.div`
  color: white;
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
  color: ${(props) => (props.isHost ? "#00c853" : "white")};
`;

const ChatContainer = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
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
    flex-direction: column;
  }
`;

const BottomCard = styled.div`
  flex: 1;
  min-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;

  @media (max-width: 1200px) {
    min-width: 100%;
  }
`;

export default function Meeting() {
  const { id } = useParams();
  const [meetingData, setMeetingData] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("book");
  const [isHost, setIsHost] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const token = localStorage.getItem("token");

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        // 토큰에서 사용자 정보 추출
        const tokenData = parseJwt(token);
        if (token) {
          setUserEmail(tokenData.sub);
        }

        const response = await axios.get(`/meetings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMeetingData(response.data);
        // 호스트 이메일과 현재 사용자 이메일 비교
        setIsHost(response.data.hostEmail === tokenData?.sub);
      } catch (error) {
        console.error("미팅 데이터 가져오기 실패:", error);
        if (error.message === "로그인이 필요합니다.") {
          alert("로그인이 필요한 서비스입니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div style={{ color: "white", textAlign: "center", width: "100%" }}>
          로딩 중...
        </div>
      </Container>
    );
  }

  if (!meetingData) {
    return (
      <Container>
        <div style={{ color: "white", textAlign: "center", width: "100%" }}>
          미팅 정보를 찾을 수 없습니다.
        </div>
      </Container>
    );
  }

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
                참여자 목록 ({meetingData.participants?.length || 0}/
                {meetingData.maxMembers})
              </MemberTitle>
              <Member className="host">
                <MemberName isHost={true}>
                  {meetingData.hostNickname}
                </MemberName>
              </Member>
              {/* 닉네임 정보 보여주기 */}
              {meetingData.participants?.map((member) => (
                <Member key={member.userId}>
                  <MemberName isHost={false}>{member.nickname}</MemberName>
                </Member>
              ))}
            </MemberList>
          </Sidebar>
        </SidebarContainer>

        <ChatContainer>
          <ChatHeader>실시간 채팅 - {meetingData.title}</ChatHeader>

          <ChatComponent
            appId="F36A6CE4-7BB5-4446-B6B6-440DCCD40F2C"
            userId={userEmail}
            channelName="Book-Club-Room(예시)"
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
