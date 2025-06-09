# ReTalk
누구나 자유롭게 참여하는 독서 토론 플랫폼 <br>
Developer @김민정 @장수원 @정혜영 @조은지 @최지우 @홍영준

## FrontEnd
#### Frontend 초기 실행 방법

```
# 1. 레포지토리 클론
git clone https://github.com/zelatndnjs/RETALK
cd frontend

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm start
```

<hr>

### 주요 기능 설명
#### Read – 책 리뷰 기능
1. 알라딘 Open API를 통해 도서를 검색하고 선택할 수 있습니다.
2. 사용자는 선택한 책에 대한 리뷰를 작성할 수 있습니다.
#### Talk – 토론 모임 게시글 기능
1. 책을 주제로 토론 모임 게시글을 작성할 수 있습니다.
2. 다른 사용자가 모임에 참여 신청을 할 수 있으며,
3. 호스트는 신청자를 확인하고 승인/거절할 수 있습니다.
####  Meeting – 모임 내부 활동 기능
1. 승인된 참여자는 해당 모임의 실시간 채팅에 참여할 수 있습니다.
2. 호스트는 토론 일정 및 공지사항을 등록할 수 있습니다.

<hr>

### 기술 스택
1. FrontEnd : React.js, React Router, Styled-components
2. API 통신 : Axios, Aladin Open API
3. 채팅 기능 : SendBird SDK
4. 상태 관리 : useState, useEffect, Context API
5. 기타 : React-Calendar, JWT 인증, 모바일 반응형 설계


