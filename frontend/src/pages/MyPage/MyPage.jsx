import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../api/axioInstance";

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

const ProfileSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  color: white;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #00c853;
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #00c853;
`;

const UserEmail = styled.p`
  color: #c4c4c4;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  color: #00c853;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #c4c4c4;
`;

const ContentSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #00c853;
  margin-bottom: 1rem;
`;

const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MeetingItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MeetingTitle = styled.div`
  font-size: 1.1rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const MeetingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #c4c4c4;
  font-size: 0.9rem;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const BookItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BookTitle = styled.div`
  padding: 0.75rem;
  color: white;
  font-size: 0.9rem;
  text-align: center;
`;

const JoinRequestsButton = styled.button`
  background: rgba(0, 200, 83, 0.1);
  color: #00c853;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(0, 200, 83, 0.2);
  }
`;

const RequestBadge = styled.span`
  background: #00c853;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: #00c853;
  font-size: 1.2rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #c4c4c4;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: white;
  }
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RequestItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RequestInfo = styled.div`
  color: white;
`;

const RequestActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &.approve {
    background: #00c853;
    color: white;

    &:hover {
      background: #00b248;
    }
  }

  &.reject {
    background: #ff4444;
    color: white;

    &:hover {
      background: #cc0000;
    }
  }
`;

export default function MyPage() {
  const [userData, setUserData] = useState({
    name: "김독서",
    email: "reader@example.com",
    profileImage: null,
    stats: {
      totalMeetings: 15,
      activeMeetings: 3,
      booksRead: 12,
      reviews: 8,
    },
    meetings: {
      hosting: [
        {
          id: 1,
          title: "해리포터 독서모임",
          bookTitle: "해리포터와 마법사의 돌",
          members: 5,
          maxMembers: 8,
          nextMeeting: "2024-03-25",
          joinRequests: [
            { id: 1, userId: 101, name: "신청자1", email: "user1@example.com" },
            { id: 2, userId: 102, name: "신청자2", email: "user2@example.com" },
          ],
        },
        {
          id: 2,
          title: "소설 읽기 모임",
          bookTitle: "데미안",
          members: 4,
          maxMembers: 6,
          nextMeeting: "2024-03-27",
          joinRequests: [],
        },
      ],
      participating: [
        {
          id: 3,
          title: "철학 독서모임",
          bookTitle: "소크라테스의 변명",
          members: 6,
          maxMembers: 8,
          nextMeeting: "2024-03-26",
        },
      ],
    },
    books: [
      {
        id: 1,
        title: "해리포터와 마법사의 돌",
        cover: "https://example.com/book1.jpg",
      },
      {
        id: 2,
        title: "데미안",
        cover: "https://example.com/book2.jpg",
      },
      {
        id: 3,
        title: "소크라테스의 변명",
        cover: "https://example.com/book3.jpg",
      },
    ],
  });

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        // const response = await axios.get("/users/me", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // setUserData(response.data);
      } catch (error) {
        console.error("사용자 데이터 가져오기 실패:", error);
        if (error.message === "로그인이 필요합니다.") {
          alert("로그인이 필요한 서비스입니다.");
          // navigate('/login');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleRespondToJoin = async (meetingId, userId, approve) => {
    try {
      await axios.post(`/meetings/${meetingId}/respond`, null, {
        params: {
          userId,
          approve,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // 성공적으로 처리되면 UI 업데이트
      setUserData((prev) => ({
        ...prev,
        meetings: {
          ...prev.meetings,
          hosting: prev.meetings.hosting.map((meeting) => {
            if (meeting.id === meetingId) {
              return {
                ...meeting,
                joinRequests: meeting.joinRequests.filter(
                  (request) => request.userId !== userId
                ),
                members: approve ? meeting.members + 1 : meeting.members,
              };
            }
            return meeting;
          }),
        },
      }));

      alert(approve ? "참여를 승인했습니다." : "참여를 거절했습니다.");
    } catch (error) {
      console.error("참여 신청 응답 실패:", error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const openRequestsModal = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRequestsModal(true);
  };

  return (
    <Container>
      <MainContent>
        <ProfileSection>
          <ProfileImage>
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="프로필" />
            ) : (
              "📚"
            )}
          </ProfileImage>
          <ProfileInfo>
            <UserName>{userData.name}</UserName>
            <UserEmail>{userData.email}</UserEmail>
          </ProfileInfo>
          <StatsContainer>
            <StatBox>
              <StatNumber>{userData.stats.totalMeetings}</StatNumber>
              <StatLabel>전체 모임</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>{userData.stats.activeMeetings}</StatNumber>
              <StatLabel>진행중인 모임</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>{userData.stats.booksRead}</StatNumber>
              <StatLabel>읽은 책</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>{userData.stats.reviews}</StatNumber>
              <StatLabel>작성한 리뷰</StatLabel>
            </StatBox>
          </StatsContainer>
        </ProfileSection>

        <ContentSection>
          <Section>
            <SectionTitle>내가 주최하는 모임</SectionTitle>
            <MeetingList>
              {userData.meetings.hosting.map((meeting) => (
                <MeetingItem key={meeting.id}>
                  <div>
                    <MeetingTitle>{meeting.title}</MeetingTitle>
                    <MeetingInfo>
                      <span>{meeting.bookTitle}</span>
                      <span>
                        {meeting.members}/{meeting.maxMembers}명 · 다음 모임:{" "}
                        {meeting.nextMeeting}
                      </span>
                    </MeetingInfo>
                  </div>
                  {meeting.joinRequests.length > 0 && (
                    <JoinRequestsButton
                      onClick={() => openRequestsModal(meeting)}
                    >
                      참여 신청
                      <RequestBadge>{meeting.joinRequests.length}</RequestBadge>
                    </JoinRequestsButton>
                  )}
                </MeetingItem>
              ))}
            </MeetingList>
          </Section>

          <Section>
            <SectionTitle>참여중인 모임</SectionTitle>
            <MeetingList>
              {userData.meetings.participating.map((meeting) => (
                <MeetingItem key={meeting.id}>
                  <MeetingTitle>{meeting.title}</MeetingTitle>
                  <MeetingInfo>
                    <span>{meeting.bookTitle}</span>
                    <span>
                      {meeting.members}/{meeting.maxMembers}명 · 다음 모임:{" "}
                      {meeting.nextMeeting}
                    </span>
                  </MeetingInfo>
                </MeetingItem>
              ))}
            </MeetingList>
          </Section>

          <Section>
            <SectionTitle>읽은 책</SectionTitle>
            <BookList>Read페이지에 선택한 것 추가할 예정</BookList>
          </Section>
        </ContentSection>
      </MainContent>

      {showRequestsModal && selectedMeeting && (
        <Modal onClick={() => setShowRequestsModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedMeeting.title} - 참여 신청 목록</ModalTitle>
              <CloseButton onClick={() => setShowRequestsModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <RequestList>
              {selectedMeeting.joinRequests.map((request) => (
                <RequestItem key={request.id}>
                  <RequestInfo>
                    <div>{request.name}</div>
                    <div style={{ color: "#c4c4c4", fontSize: "0.9rem" }}>
                      {request.email}
                    </div>
                  </RequestInfo>
                  <RequestActions>
                    <ActionButton
                      className="approve"
                      onClick={() =>
                        handleRespondToJoin(
                          selectedMeeting.id,
                          request.userId,
                          true
                        )
                      }
                    >
                      승인
                    </ActionButton>
                    <ActionButton
                      className="reject"
                      onClick={() =>
                        handleRespondToJoin(
                          selectedMeeting.id,
                          request.userId,
                          false
                        )
                      }
                    >
                      거절
                    </ActionButton>
                  </RequestActions>
                </RequestItem>
              ))}
              {selectedMeeting.joinRequests.length === 0 && (
                <div
                  style={{
                    color: "#c4c4c4",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                >
                  새로운 참여 신청이 없습니다.
                </div>
              )}
            </RequestList>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
