// src/api/chatApi.js
import api from './axioInstance';

// 1) 그룹 채널 생성
export function createChannel(channelName, userIds) {
  return api.post(
    `/sendbird/channels?channelName=${encodeURIComponent(channelName)}`,
    userIds
  );
}

// 2) 기존 채널에 사용자 초대
export function inviteUser(channelUrl, userIds) {
  return api.post(
    `/sendbird/channels/${encodeURIComponent(channelUrl)}/invite`,
    userIds
  );
}

// 3) 채팅 기능 ON
export function turnOnChat(meetingId) {
  return api.patch(`/admin/meetings/${meetingId}/chat-on`);
}

// 4) 채팅 기능 OFF
export function turnOffChat(meetingId) {
  return api.patch(`/admin/meetings/${meetingId}/chat-off`);
}