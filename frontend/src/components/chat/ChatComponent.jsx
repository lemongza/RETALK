// src/components/chat/ChatComponent.jsx
import React, { useEffect, useState, useRef } from "react";

export default function ChatComponent({ appId, userId, channelName }) {
  const [sb, setSb] = useState(null);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef();

  // 1) SendBird SDK 로드 & connect
  useEffect(() => {
    if (!window.SendBird) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/sendbird/3.1.33/SendBird.min.js";
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

      const existing = channels.find(c => c.name === channelName);
      const enterChannel = ch => {
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
      setMessages(ms => [...ms, msg]);
    };
    sb.addChannelHandler("openHandler", h);
    return () => sb.removeChannelHandler("openHandler");
  }, [sb, channel]);

  // 4) 메시지 전송
  const send = () => {
    if (!channel || !text.trim()) return;
    channel.sendUserMessage(text, (msg, err) => {
      if (err) {
        console.error("메시지 전송 오류:", err);
        return;
      }
      setMessages(ms => [...ms, msg]);
      setText("");
    });
  };

  // 5) 자동 스크롤
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 8 }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m._sender.userId}:</strong> {m.message}</p>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", marginTop: 8 }}>
        <input
          style={{ flex: 1 }}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button onClick={send}>전송</button>
      </div>
    </div>
  );
}
