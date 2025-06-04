import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../api/axioInstance";
import { useNavigate } from "react-router-dom";

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

const ProfileInfo = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  padding-top: 1rem;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  color: #00c853;
  margin: 0;
`;

const UserEmail = styled.p`
  color: #c4c4c4;
  font-size: 1rem;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  color: #00c853;
  //margin-bottom: 0.5rem;
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
  background: rgba(255, 255, 255, 0.2);
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
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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
  backdrop-filter: blur(2px);
  will-change: transform;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #222;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  color: white;
  min-width: 300px;
  width: 20%;
  z-index: 9999;
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

const ManageButton = styled.button`
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

const ManageModalContent = styled(ModalContent)`
  //background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;

  .manage-options {
    display: flex;
    flex-direction: column;
  }

  .manage-option {
    padding: 1rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .badge {
      background: #00c853;
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .meeting-title {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .meeting-date {
    color: #c4c4c4;
    font-size: 0.9rem;
  }
`;

export default function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      console.log(response.data);

      // 사용자의 모임 정보 가져오기 (호스트 모임과 참여 모임 각각 조회)
      const [hostedResponse, joinedResponse] = await Promise.all([
        axios.get("/users/me/hosted", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("/users/me/meetings/joined", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // 호스트 모임과 참여 모임 데이터 합치기
      const hostedMeetings = hostedResponse.data.map((meeting) => ({
        ...meeting,
        isHost: true,
      }));
      const joinedMeetings = joinedResponse.data.map((meeting) => ({
        ...meeting,
        isHost: false,
      }));
      setMeetings([...hostedMeetings, ...joinedMeetings]);
    } catch (error) {
      console.error("사용자 정보 로딩 실패:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToJoin = async (meetingId, userId, approve) => {
    try {
      await axios.post(
        `/meetings/${meetingId}/respond?userId=${userId}&approve=${approve}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 요청 처리 후 데이터 새로고침
      fetchUserData();
      alert(
        approve ? "참여 요청을 승인했습니다." : "참여 요청을 거절했습니다."
      );
    } catch (error) {
      console.error("요청 처리 실패:", error);
      if (error.response?.status === 403) {
        alert("호스트만 참여 요청을 처리할 수 있습니다.");
      } else {
        alert("요청 처리에 실패했습니다.");
      }
    }
  };

  //모집 마감
  const handleCloseRecruitment = async (meetingId) => {
    try {
      await axios.patch(
        `/meetings/${meetingId}/status?active=${!selectedMeeting.active}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("모집 상태가 변경되었습니다.");
      fetchUserData();
      setShowManageModal(false);
    } catch (error) {
      console.error("모집 마감 실패:", error);
      alert("모집 마감에 실패했습니다.");
    }
  };

  if (loading) {
    return <Container>로딩 중...</Container>;
  }

  // 호스트 모임과 참여 모임 개수 계산
  const hostedCount = meetings.filter((m) => m.isHost).length;
  const joinedCount = meetings.filter((m) => !m.isHost).length;

  return (
    <Container>
      <MainContent>
        <ProfileSection>
          {/* <ProfileImage>{userData?.name?.charAt(0) || "U"}</ProfileImage> */}
          <ProfileInfo>
            <UserName>{userData?.name || "사용자"}</UserName>
            <UserEmail>{userData?.email || ""}</UserEmail>
          </ProfileInfo>
          <StatsContainer>
            <StatBox>
              <StatNumber>{hostedCount}</StatNumber>
              <StatLabel>주최한 모임</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>{joinedCount}</StatNumber>
              <StatLabel>참여 모임</StatLabel>
            </StatBox>
          </StatsContainer>
        </ProfileSection>

        <ContentSection>
          <Section>
            <SectionTitle>내가 주최하는 모임</SectionTitle>
            <MeetingList>
              {meetings
                .filter((m) => m.isHost)
                .map((meeting) => (
                  <MeetingItem key={meeting.id}>
                    <div
                      onClick={() => navigate(`/talk/meeting/${meeting.id}`)}
                    >
                      <MeetingTitle>{meeting.title}</MeetingTitle>
                      <div
                        style={{
                          color: meeting.active ? "#00C853" : "#FF4444",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {meeting.active ? "모집중" : "모집마감"}
                      </div>
                      <MeetingInfo>
                        <span>{meeting.bookTitle}</span>
                        <span>{meeting.startDate?.slice(0, 10)}</span>
                      </MeetingInfo>
                    </div>
                    <ManageButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMeeting(meeting);
                        setShowManageModal(true);
                      }}
                    >
                      관리
                      {meeting.pendingRequests > 0 && (
                        <RequestBadge>{meeting.pendingRequests}</RequestBadge>
                      )}
                    </ManageButton>
                  </MeetingItem>
                ))}
            </MeetingList>
          </Section>

          <Section>
            <SectionTitle>참여 중인 모임</SectionTitle>
            <MeetingList>
              {meetings
                .filter((m) => !m.isHost)
                .map((meeting) => (
                  <MeetingItem
                    key={meeting.id}
                    onClick={() => navigate(`/talk/meeting/${meeting.id}`)}
                  >
                    <MeetingTitle>{meeting.title}</MeetingTitle>
                    <MeetingInfo>
                      <span>{meeting.bookTitle}</span>
                      <span>{meeting.startDate?.slice(0, 10)}</span>
                    </MeetingInfo>
                  </MeetingItem>
                ))}
            </MeetingList>
          </Section>
        </ContentSection>
      </MainContent>

      {showManageModal && selectedMeeting && (
        <Modal onClick={() => setShowManageModal(false)}>
          <ManageModalContent onClick={(e) => e.stopPropagation()}>
            <div className="meeting-title">
              <span>{selectedMeeting.title}</span>
              <span className="meeting-date">
                {selectedMeeting.startDate?.slice(0, 10)}
              </span>
            </div>

            <div className="manage-options">
              <div
                className="manage-option"
                onClick={() => {
                  setShowManageModal(false);
                  setShowRequestsModal(true);
                }}
              >
                <span>참여 신청 관리</span>
                {selectedMeeting.pendingRequests > 0 && (
                  <span className="badge">
                    {selectedMeeting.pendingRequests}
                  </span>
                )}
              </div>

              <div
                className="manage-option"
                onClick={() => {
                  const confirmMessage = selectedMeeting.active
                    ? "모집을 마감하시겠습니까?"
                    : "모집을 다시 여시겠습니까?";
                  if (window.confirm(confirmMessage)) {
                    handleCloseRecruitment(
                      selectedMeeting.id,
                      !selectedMeeting.active
                    );
                  }
                }}
                style={{
                  color: selectedMeeting.active ? "#FF4444" : "#00C853",
                }}
              >
                {selectedMeeting.active ? "모집 마감" : "모집중으로 열기"}
              </div>
            </div>
          </ManageModalContent>
        </Modal>
      )}

      {showRequestsModal && selectedMeeting && (
        <Modal onClick={() => setShowRequestsModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>참여 요청 목록</ModalTitle>
              <CloseButton onClick={() => setShowRequestsModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <RequestList>
              {selectedMeeting.joinRequests?.map((request) => (
                <MeetingItem key={request.id}>
                  <MeetingTitle>{request.userEmail}</MeetingTitle>
                  <MeetingInfo>
                    <button
                      onClick={() =>
                        handleRespondToJoin(
                          selectedMeeting.id,
                          request.userId,
                          true
                        )
                      }
                      style={{
                        color: "#00C853",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(0, 200, 83, 0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      승인
                    </button>
                    <button
                      onClick={() =>
                        handleRespondToJoin(
                          selectedMeeting.id,
                          request.userId,
                          false
                        )
                      }
                      style={{
                        color: "#FF4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255, 68, 68, 0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      거절
                    </button>
                  </MeetingInfo>
                </MeetingItem>
              ))}
              {(!selectedMeeting.joinRequests ||
                selectedMeeting.joinRequests.length === 0) && (
                <div
                  style={{
                    color: "#c4c4c4",
                    textAlign: "center",
                    padding: "2rem",
                    fontSize: "0.9rem",
                  }}
                >
                  새로운 참여 요청이 없습니다.
                </div>
              )}
            </RequestList>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
