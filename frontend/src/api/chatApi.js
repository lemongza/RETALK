// src/api/chatApi.js
import api from './axioInstance';

// 1) 그룹 채널 생성
// channelName: string, userIds: string[]
export function createChannel(channelName, userIds) {
  // GET 파라미터는 쿼리로, 바디에 유저 리스트
  return api.post(
    `/sendbird/channels?channelName=${encodeURIComponent(channelName)}`,
    userIds
  );
}

// 2) 기존 채널에 사용자 초대
// channelUrl: string, userIds: string[]
export function inviteUser(channelUrl, userIds) {
  return api.post(
    `/sendbird/channels/${encodeURIComponent(channelUrl)}/invite`,
    userIds
  );
}

