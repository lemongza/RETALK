import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axioInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

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

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &.mine {
    align-items: flex-end;
  }
`;

const MessageContent = styled.div`
  background: ${(props) =>
    props.isMine ? "#00c853" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  max-width: 70%;
`;

const MessageInfo = styled.div`
  font-size: 0.8rem;
  color: #c4c4c4;
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
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

const SendButton = styled.button`
  background: #00c853;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #00b248;
  }
`;

const TodoTitle = styled.h3`
  font-size: 1.2rem;
  color: #00c853;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
`;

const TodoCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #00c853;
`;

const TodoText = styled.span`
  color: ${(props) => (props.checked ? "#666" : "white")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  flex: 1;
`;

const TodoInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #00c853;
  }
`;

const AddButton = styled.button`
  background: #00c853;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #00b248;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const HostControls = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const HostControlTitle = styled.h3`
  font-size: 1.1rem;
  color: #00c853;
  margin-bottom: 1rem;
`;

const DateTimeInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  margin-right: 1rem;

  &:focus {
    outline: none;
    border-color: #00c853;
  }
`;

const BottomSection = styled.div`
  display: flex;
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

const CalendarSection = styled.div`
  flex: 6;
  min-width: 400px;
`;

const ScheduleDetailSection = styled.div`
  flex: 4;
  min-width: 300px;
`;

const ScheduleDetail = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ScheduleDate = styled.div`
  color: #00c853;
  font-size: 0.9rem;
`;

const NoticeSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NoticeTitle = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const NoticeContent = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  white-space: pre-wrap;
  margin-bottom: 1rem;
`;

const NoticeInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #00c853;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const AssignmentList = styled.div`
  margin-top: 1rem;
`;

const AssignmentItem = styled.div`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AssignmentContent = styled.div`
  flex: 1;
`;

const AssignmentTitle = styled.div`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const AssignmentDescription = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const AssignmentDueDate = styled.div`
  color: #666;
  font-size: 0.8rem;
  margin-left: 1rem;
`;

const StyledCalendar = styled.div`
  .react-calendar {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    border-radius: 8px;
    padding: 1.5rem;
    color: white;
    font-size: 1.1rem;
  }

  .react-calendar__navigation {
    margin-bottom: 1rem;
  }

  .react-calendar__navigation button {
    color: white;
    background: none;
    font-size: 1.2rem;
    min-width: 44px;

    &:enabled:hover,
    &:enabled:focus {
      background: rgba(255, 255, 255, 0.1);
    }

    &[disabled] {
      background: none;
      color: #666;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.8rem;
    color: #00c853;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    color: white;
    padding: 1.5rem 0.5rem;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 0.9rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &:enabled:hover,
    &:enabled:focus {
      background: rgba(255, 255, 255, 0.1);
    }

    &--now {
      background: rgba(0, 200, 83, 0.1);
      color: #00c853;
    }

    &--active {
      background: #00c853 !important;
      color: white !important;
    }

    &--past {
      color: rgba(255, 255, 255, 0.3);
    }

    .schedule-title {
      font-size: 0.7rem;
      color: #00c853;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      margin-top: 0.25rem;
    }
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
  }

  .react-calendar__month-view__days__day {
    abbr {
      display: block;
      margin-bottom: 0.25rem;
    }
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1200px) {
    flex-direction: column;
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
  const [todos, setTodos] = useState([
    { id: 1, text: "1장 읽기", completed: false },
    { id: 2, text: "중요 문구 메모하기", completed: true },
    { id: 3, text: "토론 주제 생각해오기", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: "2024-03-21",
      time: "19:00",
      title: "1장 토론",
      notice: "1장을 읽고 인상 깊었던 부분을 정리해오세요.",
      assignments: [
        {
          id: 1,
          title: "1장 읽기",
          description: "1장 전체를 읽고 중요한 부분에 밑줄을 그어오세요.",
          dueDate: "2024-03-21 17:00",
        },
        {
          id: 2,
          title: "토론 주제 준비",
          description: "논의하고 싶은 주제 2개 이상 준비해오기",
          dueDate: "2024-03-21 17:00",
        },
      ],
    },
    {
      id: 2,
      date: "2024-03-28",
      time: "19:00",
      title: "2장 토론",
      notice: "",
      assignments: [],
    },
    {
      id: 3,
      date: "2024-04-04",
      time: "19:00",
      title: "3장 토론",
      notice: "",
      assignments: [],
    },
  ]);
  const [newNotice, setNewNotice] = useState("");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

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

  // 임시 데이터 (나중에 실제 API로 대체)
  const messages = [
    {
      id: 1,
      sender: "호스트",
      content: "안녕하세요! 모두 환영합니다.",
      time: "14:00",
      isMine: false,
    },
    {
      id: 2,
      sender: "참여자1",
      content: "안녕하세요~",
      time: "14:01",
      isMine: false,
    },
    {
      id: 3,
      sender: "나",
      content: "반갑습니다!",
      time: "14:02",
      isMine: true,
    },
  ];

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSetEndDate = async () => {
    try {
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      await axios.patch(
        `/meetings/${id}/end-date`,
        {
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("토론 마감일이 설정되었습니다.");
    } catch (error) {
      console.error("마감일 설정 실패:", error);
      if (error.message === "로그인이 필요합니다.") {
        alert("로그인이 필요한 서비스입니다.");
        // navigate('/login');
      } else {
        alert("마감일 설정에 실패했습니다.");
      }
    }
  };

  const tileClassName = ({ date }) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isPast = moment(date).isBefore(moment(), "day");
    const hasSchedule = schedules.some(
      (schedule) => schedule.date === formattedDate
    );

    const classes = [];
    if (hasSchedule) classes.push("react-calendar__tile--hasSchedule");
    if (isPast) classes.push("react-calendar__tile--past");

    return classes.join(" ");
  };

  const getDaySchedules = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return schedules.filter((schedule) => schedule.date === formattedDate);
  };

  const handleUpdateNotice = (scheduleId) => {
    if (!meetingData.isHost) return;

    setSchedules(
      schedules.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, notice: newNotice }
          : schedule
      )
    );
    setNewNotice("");
  };

  const handleAddAssignment = (scheduleId) => {
    if (!meetingData.isHost) return;
    if (!newAssignment.title || !newAssignment.dueDate) return;

    setSchedules(
      schedules.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              assignments: [
                ...schedule.assignments,
                {
                  id: Date.now(),
                  ...newAssignment,
                },
              ],
            }
          : schedule
      )
    );
    setNewAssignment({ title: "", description: "", dueDate: "" });
  };

  const selectedSchedule = schedules.find(
    (schedule) => schedule.date === moment(selectedDate).format("YYYY-MM-DD")
  );

  const tileContent = ({ date }) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const daySchedules = schedules.filter(
      (schedule) => schedule.date === formattedDate
    );

    return daySchedules.map((schedule) => (
      <div key={schedule.id} className="schedule-title">
        {schedule.title}
      </div>
    ));
  };

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
          <ChatMessages>
            {messages.map((message) => (
              <Message
                key={message.id}
                className={message.isMine ? "mine" : ""}
              >
                {!message.isMine && <MessageInfo>{message.sender}</MessageInfo>}
                <MessageContent isMine={message.isMine}>
                  {message.content}
                </MessageContent>
                <MessageInfo>{message.time}</MessageInfo>
              </Message>
            ))}
          </ChatMessages>
          <ChatInput>
            <Input placeholder="메시지를 입력하세요..." />
            <SendButton>전송</SendButton>
          </ChatInput>
        </ChatContainer>
      </MainContent>
      <BottomSection>
        <BottomCard style={{ flex: 6 }}>
          <TodoTitle>토론 일정</TodoTitle>
          <ScheduleContainer>
            <CalendarSection>
              <StyledCalendar>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  locale="ko"
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                />
              </StyledCalendar>
            </CalendarSection>

            <ScheduleDetailSection>
              {selectedSchedule ? (
                <ScheduleDetail>
                  <ScheduleHeader>
                    <div>
                      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
                        {selectedSchedule.title}
                      </h3>
                      <ScheduleDate>
                        {selectedSchedule.date} {selectedSchedule.time}
                      </ScheduleDate>
                    </div>
                  </ScheduleHeader>

                  <NoticeSection>
                    <NoticeTitle>공지사항</NoticeTitle>
                    {selectedSchedule.notice && (
                      <NoticeContent>{selectedSchedule.notice}</NoticeContent>
                    )}
                    {isHost && (
                      <>
                        <NoticeInput
                          value={newNotice}
                          onChange={(e) => setNewNotice(e.target.value)}
                          placeholder="공지사항을 입력하세요..."
                        />
                        <AddButton
                          onClick={() =>
                            handleUpdateNotice(selectedSchedule.id)
                          }
                        >
                          공지 등록
                        </AddButton>
                      </>
                    )}
                  </NoticeSection>

                  <NoticeSection>
                    <NoticeTitle>과제</NoticeTitle>
                    <AssignmentList>
                      {selectedSchedule.assignments.map((assignment) => (
                        <AssignmentItem key={assignment.id}>
                          <AssignmentContent>
                            <AssignmentTitle>
                              {assignment.title}
                            </AssignmentTitle>
                            <AssignmentDescription>
                              {assignment.description}
                            </AssignmentDescription>
                          </AssignmentContent>
                          <AssignmentDueDate>
                            마감: {assignment.dueDate}
                          </AssignmentDueDate>
                        </AssignmentItem>
                      ))}
                    </AssignmentList>
                    {isHost && (
                      <div style={{ marginTop: "1rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          <input
                            type="text"
                            value={newAssignment.title}
                            onChange={(e) =>
                              setNewAssignment({
                                ...newAssignment,
                                title: e.target.value,
                              })
                            }
                            placeholder="과제 제목"
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              color: "white",
                            }}
                          />
                          <input
                            type="text"
                            value={newAssignment.description}
                            onChange={(e) =>
                              setNewAssignment({
                                ...newAssignment,
                                description: e.target.value,
                              })
                            }
                            placeholder="과제 설명"
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              color: "white",
                            }}
                          />
                          <input
                            type="datetime-local"
                            value={newAssignment.dueDate}
                            onChange={(e) =>
                              setNewAssignment({
                                ...newAssignment,
                                dueDate: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              marginBottom: "0.5rem",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              color: "white",
                            }}
                          />
                        </div>
                        <AddButton
                          onClick={() =>
                            handleAddAssignment(selectedSchedule.id)
                          }
                        >
                          과제 추가
                        </AddButton>
                      </div>
                    )}
                  </NoticeSection>
                </ScheduleDetail>
              ) : null}
            </ScheduleDetailSection>
          </ScheduleContainer>
        </BottomCard>

        <BottomCard style={{ flex: 4 }}>
          <TodoTitle>
            호스트가 내주는 숙제들
            <span style={{ fontSize: "0.8rem", color: "#666" }}>
              {todos.filter((t) => t.completed).length}/{todos.length} 완료
            </span>
          </TodoTitle>
          <TodoList>
            {todos.map((todo) => (
              <TodoItem key={todo.id}>
                <TodoCheckbox
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <TodoText checked={todo.completed}>{todo.text}</TodoText>
                {isHost && (
                  <DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
                    ×
                  </DeleteButton>
                )}
              </TodoItem>
            ))}
          </TodoList>
          {isHost && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <TodoInput
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="새로운 숙제 추가"
                onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              />
              <AddButton onClick={handleAddTodo}>추가</AddButton>
            </div>
          )}
        </BottomCard>

        {isHost && (
          <BottomCard>
            <HostControlTitle>호스트 관리</HostControlTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DateTimeInput
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <AddButton onClick={handleSetEndDate}>마감일 설정</AddButton>
            </div>
          </BottomCard>
        )}
      </BottomSection>
    </Container>
  );
}
