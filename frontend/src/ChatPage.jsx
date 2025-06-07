// src/pages/Chat/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatComponent from "../../components/chat/ChatComponent";
import axios from "axios";  // 또는 meetingApi를 쓰신다면 import * as meetingApi from "../../api/meetingApi";

export default function ChatPage() {
  const { id } = useParams();               // meeting ID
  const [chatEnabled, setChatEnabled] = useState(null);
  const [channelUrl, setChannelUrl] = useState("");
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID;
  const userId = localStorage.getItem("userId"); // 혹은 토큰 디코딩
  const channelName = `meeting_${id}`;

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/admin/meetings`, 
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {} // 혹시 ID 기반 단건 조회 API가 있으면 그걸로 바꿔주세요
          }
        );
        // 만약 단건조회 API 있다면 /admin/meetings/${id} 로 호출해서 res.data.chatEnabled를 사용
        const meeting = res.data.find(m => m.id === Number(id));
        setChatEnabled(meeting.chatEnabled);
        setChannelUrl(meeting.channelUrl);
      } catch (err) {
        console.error("모임 정보 조회 실패:", err);
        setChatEnabled(false);
      }
    };
    fetchMeeting();
  }, [id]);

  // 로딩 상태
  if (chatEnabled === null) return <div>로딩 중…</div>;

  // 채팅 비활성화 됐을 때
  if (!chatEnabled) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        🚫 이 모임의 채팅 기능이 비활성화 되어 있습니다.
      </div>
    );
  }

  // 채팅 활성화 상태면 기존 컴포넌트 렌더
  return (
    <ChatComponent
      appId={appId}
      userId={userId}
      channelName={channelName}
      otherUserIds={[]}             /* 필요시 participants에서 채워주세요 */
      channelUrl={channelUrl}       /* sendbird 입장에 사용 */
    />
  );
}