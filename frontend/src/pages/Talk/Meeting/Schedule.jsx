import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../api/axioInstance";
import styled from "styled-components";
import { Button } from "../../../components/common/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Schedule({ meetingId, isHost }) {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    topic: "",
    date: "",
    time: "",
    memo: "",
  });

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`/meetings/${meetingId}/schedules`);
      setSchedules(res.data);
    } catch (err) {
      console.error("일정 불러오기 실패:", err);
    }
  };

  const handleCreate = async () => {
    if (!newSchedule.topic || !newSchedule.date || !newSchedule.time) {
      alert("주제, 날짜, 시간을 모두 입력해주세요.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/meetings/${meetingId}/schedules`, newSchedule, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewSchedule({ topic: "", date: "", time: "", memo: "" });
      fetchSchedules();
    } catch (err) {
      console.error("일정 추가 실패:", err);
      alert("일정 추가에 실패했습니다.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/meetings/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSchedules();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [meetingId]);

  const [filterDate, setFilterDate] = useState("");

  // 필터링된 일정 목록
  const filteredSchedules = filterDate
    ? schedules.filter((schedule) => schedule.date === filterDate)
    : schedules;

  return (
    <Container>
      <ScheduleTitle>토론 일정</ScheduleTitle>
      <ScheduleContent>
        <div>
          <ScheduleList>
            {filteredSchedules.length === 0 ? (
              <div style={{ color: "#888" }}>등록된 일정이 없습니다.</div>
            ) : (
              filteredSchedules.map((schedule) => {
                // 시, 분까지만 표시
                const timeDisplay = schedule.time
                  ? schedule.time.slice(0, 5)
                  : "";
                return (
                  <ScheduleItem key={schedule.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <strong>{schedule.topic}</strong>
                      <span>{schedule.date}</span>
                      <span>{timeDisplay}</span>
                    </div>
                    <div>📝 {schedule.memo}</div>
                    {isHost && (
                      <button onClick={() => handleDelete(schedule.id)}>
                        삭제
                      </button>
                    )}
                  </ScheduleItem>
                );
              })
            )}
          </ScheduleList>
        </div>
        {isHost ? (
          <InputSection>
            <input
              type="text"
              placeholder="주제"
              value={newSchedule.topic}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, topic: e.target.value })
              }
            />
            <input
              type="date"
              value={newSchedule.date}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, date: e.target.value })
              }
            />
            <input
              type="time"
              value={newSchedule.time}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, time: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="메모"
              value={newSchedule.memo}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, memo: e.target.value })
              }
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={handleCreate}>일정 추가</button>
            </div>
          </InputSection>
        ) : (
          <StyledCalendar>
            <Calendar
              selectRange={false}
              onChange={(date) => {
                if (date instanceof Date) {
                  // 날짜를 현지 시간대로 변환하여 처리
                  const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  );
                  setFilterDate(localDate.toISOString().slice(0, 10));
                }
              }}
              value={filterDate ? new Date(filterDate) : null}
              calendarType="gregory"
              formatDay={(locale, date) => date.getDate()}
              tileClassName={({ date }) => {
                // 날짜를 현지 시간대로 변환하여 비교
                const localDate = new Date(
                  date.getTime() - date.getTimezoneOffset() * 60000
                );
                const dateString = localDate.toISOString().slice(0, 10);
                return filterDate === dateString
                  ? "react-calendar__tile--active"
                  : null;
              }}
            />
            {filterDate && (
              <Button
                onClick={() => setFilterDate("")}
                style={{
                  background: "#444",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                전체 보기
              </Button>
            )}
          </StyledCalendar>
        )}
      </ScheduleContent>
    </Container>
  );
}

Schedule.propTypes = {
  meetingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isHost: PropTypes.bool.isRequired,
};

export { Schedule };
export default Schedule;

const Container = styled.div`
  //padding: 1rem;
`;

const ScheduleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;

const InputSection = styled.div`
  display: grid;
  align-items: start;
  gap: 2rem;
  margin-bottom: 1rem;

  input {
    color: white;
    padding: 0.7rem;
    width: 380px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
  }

  button {
    width: 380px;
    padding: 0.7rem;
    font-size: 1rem;
    color: white;
    border-radius: 8px;
    background: #00c853;
    border: 1px solid #00c853;
    box-sizing: border-box;
  }
  :hover {
    cursor: grab;
  }
`;

const ScheduleTitle = styled.h3`
  font-size: 1.2rem;
  color: #00c853;
  //margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ScheduleList = styled.ul`
  //margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;
  padding-left: 0;
`;

const ScheduleItem = styled.li`
  list-style: none;
  width: 700px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  line-height: 1.6;

  strong {
    color: #00c853;
    font-size: 1.3rem;
    letter-spacing: 0.1rem;
    display: inline-block;
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
  }
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
