import React, { useEffect, useState, useRef } from "react";

export default function ChatComponent({ appId, userId, channelName }) {
  const [sbInstance, setSbInstance] = useState(null);
  const [openChannel, setOpenChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // 1) Sendbird SDK 로드 & 사용자 연결
  useEffect(() => {
    // SendBird 전역 로드 확인
    if (typeof window.SendBird === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/sendbird/3.1.33/SendBird";
      script.onload = () => connectSendBird();
      document.head.appendChild(script);
    } else {
      connectSendBird();
    }
    function connectSendBird() {
      const sb = new window.SendBird({ appId });
      sb.connect(userId, (user, err) => {
        if (err) {
          console.error("SendBird 연결 오류:", err);
          appendSystem(`연결 오류: ${err.message}`);
          return;
        }
        appendSystem(`’${user.userId}’님이 채팅에 입장했습니다.`);
        setSbInstance(sb);
      });
    }
    // eslint-disable-next-line
  }, [appId, userId]);

  // 2) OpenChannel 조회 → 생성 → 입장
  useEffect(() => {
    if (!sbInstance) return;
    const listQuery = sbInstance.OpenChannel.createOpenChannelListQuery();
    listQuery.limit = 10;
    listQuery.next((channels, err) => {
      if (err) {
        console.error("채널 리스트 조회 오류:", err);
        appendSystem(`채널 조회 실패: ${err.message}`);
        return;
      }
      const existing = channels.find((ch) => ch.name === channelName);
      const join = (channel) => {
        channel.enter((_, enterErr) => {
          if (enterErr) {
            console.error("채널 입장 오류:", enterErr);
            appendSystem(`채널 입장 실패: ${enterErr.message}`);
            return;
          }
          appendSystem(`’${channelName}’ 채널에 입장했습니다.`);
          setOpenChannel(channel);
        });
      };
      if (existing) join(existing);
      else {
        const params = new sbInstance.OpenChannelParams();
        params.name = channelName;
        sbInstance.OpenChannel.createChannel(params, (newCh, createErr) => {
          if (createErr) {
            console.error("채널 생성 오류:", createErr);
            appendSystem(`채널 생성 실패: ${createErr.message}`);
            return;
          }
          join(newCh);
        });
      }
    });
  }, [sbInstance, channelName]);

  // 3) 메시지/입장/퇴장 이벤트 구독
  useEffect(() => {
    if (!sbInstance || !openChannel) return;
    // 기존 핸들러 제거
    sbInstance.removeChannelHandler("handler");
    const handler = new sbInstance.ChannelHandler();
    handler.onMessageReceived = (_ch, msg) => {
      setMessages((prev) => [
        ...prev,
        { sender: msg._sender.userId, text: msg.message },
      ]);
    };
    handler.onUserEntered = (_ch, user) => {
      appendSystem(`’${user.userId}’님이 입장했습니다.`);
    };
    handler.onUserExited = (_ch, user) => {
      appendSystem(`’${user.userId}’님이 퇴장했습니다.`);
    };
    sbInstance.addChannelHandler("handler", handler);
    return () => {
      sbInstance.removeChannelHandler("handler");
    };
  }, [sbInstance, openChannel]);

  // 4) 입장/퇴장 시스템 메시지 추가 헬퍼
  function appendSystem(text) {
    setSystemMessages((prev) => [...prev, text]);
  }

  // 5) “전송” 버튼 클릭
  const handleSend = () => {
    if (!inputText.trim() || !openChannel) return;
    openChannel.sendUserMessage(inputText.trim(), (msg, err) => {
      if (err) {
        console.error("메시지 전송 오류:", err);
        appendSystem(`전송 실패: ${err.message}`);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { sender: msg._sender.userId, text: msg.message },
      ]);
      setInputText("");
    });
  };

  // 6) “나가기” 버튼 클릭
  const handleLeave = () => {
    if (!openChannel) return;
    openChannel.exit((_, err) => {
      if (err) {
        console.error("채널 퇴장 오류:", err);
        appendSystem(`퇴장 실패: ${err.message}`);
        return;
      }
      appendSystem(`’${userId}’님이 퇴장했습니다.`);
      // 팝업이라면 window.close() 가능
    });
  };

  // 7) 메시지 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, systemMessages]);

  return (
    <div style={{ width: 400, margin: "20px auto", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "auto",
          padding: 8,
          background: "#fafafa",
        }}
      >
        {systemMessages.map((text, i) => (
          <p key={`sys-${i}`} style={{ color: "#888", fontStyle: "italic" }}>
            {text}
          </p>
        ))}
        {messages.map((m, i) => (
          <p key={`msg-${i}`}>{`[${m.sender}] ${m.text}`}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
          style={{ width: "calc(100% - 120px)", padding: 4 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          style={{ padding: "4px 8px", marginLeft: 4 }}
        >
          전송
        </button>
        <button
          onClick={handleLeave}
          style={{ padding: "4px 8px", marginLeft: 4 }}
        >
          나가기
        </button>
      </div>
    </div>
  );
}
