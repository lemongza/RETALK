// src/lib/sendbird.js
import SendBird from 'sendbird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;
let sbInstance = null;

/**
 * SendBird 인스턴스 초기화 (싱글턴)
 */
export function initSendBird() {
  if (!sbInstance) {
    sbInstance = new SendBird({ appId: APP_ID });
  }
  return sbInstance;
}

/**
 * 사용자 연결
 * @param {string} userId
 * @param {string|null} accessToken
 * @returns {Promise<SendBird.User>}
 */
export function connect(userId, accessToken = null) {
  return new Promise((resolve, reject) => {
    initSendBird().connect(userId, accessToken, (user, err) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
}

/**
 * 그룹 채널 가져오기 및 메시지 수신 핸들러 등록
 * @param {string} channelUrl
 * @param {(message: SendBird.UserMessage) => void} onMessage
 * @returns {Promise<SendBird.GroupChannel>}
 */
export function subscribeToChannel(channelUrl, onMessage) {
  return new Promise((resolve, reject) => {
    initSendBird().GroupChannel.getChannel(channelUrl, (channel, err) => {
      if (err) return reject(err);
      channel.markAsRead();
      const handlerId = `handler_${channelUrl}`;
      initSendBird().addChannelHandler(handlerId, {
        onMessageReceived(eventChannel, message) {
          if (eventChannel.url === channelUrl) {
            onMessage(message);
          }
        }
      });
      resolve(channel);
    });
  });
}

/**
 * 채널에 메시지 전송
 * @param {SendBird.GroupChannel} channel
 * @param {string} text
 * @returns {Promise<SendBird.UserMessage>}
 */
export function sendMessage(channel, text) {
  return new Promise((resolve, reject) => {
    channel.sendUserMessage(text, (message, err) => {
      if (err) reject(err);
      else resolve(message);
    });
  });
}
