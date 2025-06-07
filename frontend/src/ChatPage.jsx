// src/pages/Chat/ChatPage.jsx
import React from "react";
import ChatComponent from "../../components/chat/ChatComponent";

export default function ChatPage() {
  const appId = process.env.REACT_APP_SENDBIRD_APP_ID;      // .env 에 넣은 값
  const userId = /* 토큰에서 꺼낸 userId 또는 localStorage */;
  const { id } = useParams(); // meeting ID
  const channelName = `meeting_${id}`; 
  const otherUserIds = /* post.participants 리스트 등에서 뽑아내주세요 */;

  return (
    <ChatComponent
      appId={appId}
      userId={userId}
      channelName={channelName}
      otherUserIds={otherUserIds}
    />
  );
}
