// src/components/chat/ChatComponent.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

export default function ChatComponent({ appId, userId, channelName }) {
  const [sb, setSb] = useState(null);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef();
  const isSending = useRef(false);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // 1) SendBird SDK 로드 & connect
  useEffect(() => {
    if (!window.SendBird) {
      const s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/sendbird/3.1.33/SendBird.min.js";
      s.onload = init;
      document.head.appendChild(s);
    } else init();

    function init() {
      const sbInst = new window.SendBird({ appId });
      sbInst.connect(userId, (user, err) => {
        if (err) {
          console.error("SendBird 연결 오류:", err);
          return;
        }
        setSb(sbInst);
      });
    }
  }, [appId, userId]);

  // 2) Open Channel 조회→생성→입장
  useEffect(() => {
    if (!sb) return;

    const listQuery = sb.OpenChannel.createOpenChannelListQuery();
    listQuery.limit = 30;
    listQuery.next((channels, err) => {
      if (err) {
        console.error("채널 리스트 조회 실패:", err);
        return;
      }

      const existing = channels.find((c) => c.name === channelName);
      const enterChannel = (ch) => {
        ch.enter((_, enterErr) => {
          if (enterErr) {
            console.error("채널 입장 실패:", enterErr);
            return;
          }
          setChannel(ch);
        });
      };

      if (existing) {
        enterChannel(existing);
      } else {
        // 없으면 생성
        const params = new sb.OpenChannelParams();
        params.name = channelName;
        sb.OpenChannel.createChannel(params, (newCh, createErr) => {
          if (createErr) {
            console.error("채널 생성 실패:", createErr);
            return;
          }
          enterChannel(newCh);
        });
      }
    });
  }, [sb, channelName]);

  // 3) 메시지 핸들러
  useEffect(() => {
    if (!sb || !channel) return;
    sb.removeChannelHandler("openHandler");
    const h = new sb.ChannelHandler();
    h.onMessageReceived = (_ch, msg) => {
      setMessages((ms) => [...ms, msg]);
    };
    sb.addChannelHandler("openHandler", h);
    return () => sb.removeChannelHandler("openHandler");
  }, [sb, channel]);

  // 스크롤을 최하단으로 이동시키는 함수
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // 메시지 수신 시 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 4) 메시지 전송
  const send = () => {
    if (isSending.current || !channel || !text.trim()) return;
    isSending.current = true;
    channel.sendUserMessage(text, (msg, err) => {
      isSending.current = false;

      if (err) {
        console.error("메시지 전송 오류:", err);
        return;
      }
      setMessages((ms) => [...ms, msg]);
      setText("");
      inputRef.current?.focus(); // 입력창에 포커스 유지
    });
  };

  return (
    <ChatContainer>
      <MessagesContainer ref={messagesContainerRef}>
        {messages.map((m, i) => (
          <MessageItem key={i} isMine={m._sender.userId === userId}>
            <MessageSender>{m._sender.userId}</MessageSender>
            <MessageContent>{m.message}</MessageContent>
          </MessageItem>
        ))}
      </MessagesContainer>
      <InputContainer>
        <ChatInput
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.repeat) {
              send();
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={send}>전송</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  min-height: 600px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: calc(100% - 80px); // 입력 영역 높이를 제외한 나머지

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  max-width: 70%;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
`;

const MessageSender = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.2rem;
`;

const MessageContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.7rem 1rem;
  border-radius: 8px;
  color: white;
  word-break: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.7rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00c853;
  }

  &::placeholder {
    color: #666;
  }
`;

const SendButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: #00c853;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #00b248;
  }
`;
