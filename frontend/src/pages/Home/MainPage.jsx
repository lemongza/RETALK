// src/pages/Home/MainPage.jsx
import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header'; // ✅ Header 가져오기

const Wrapper = styled.div`
  width: 100vw;
  min-height: 200vh;
  background: #052210;
  position: relative;
`;

const FirstSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10vw;
`;

const TitleBlock = styled.div`
  text-align: right;
  color: white;
  font-family: 'Luckiest Guy';
  font-size: 6vw;
  line-height: 1.2;
  margin-bottom: 20vh;
`;

const Highlight = styled.span`
  color: #00C853;
`;

const SecondSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0vh;
  padding-bottom: 20vh;
  color: white;
`;

const SubTitle = styled.div`
  font-family: 'Pretendard';
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MainTitle = styled.div`
  font-family: 'BMHANNA';
  font-size: 6rem;
  line-height: 1.3;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  font-family: 'Pretendard';
  font-size: 1rem;
  line-height: 1.5;
  color: #ccc;
`;

const Footer = styled.footer`
  font-family: 'Pretendard';
  font-size: 1rem;
  color: #d9d9d9;
  position: absolute;
  bottom: 20px;
  left: 68px;
`;

export default function MainPage() {
  return (
    <Wrapper>
      <Header /> {/* ✅ 헤더를 직접 삽입 */}
      <FirstSection>
        <TitleBlock>
          <div>INTERACTIVE</div>
          <div>BOOK CLUB PLATFORM</div>
          <div><Highlight>READ & TALK</Highlight></div>
        </TitleBlock>
      </FirstSection>

      <SecondSection>
        <SubTitle>독서에 관심은 많지만<br /> 모임 참여가 부담스러우셨나요?</SubTitle>
        <MainTitle>
          “<br />
          <Highlight>누구나</Highlight> 자유롭게 참여하는<br />
          <Highlight>독서 토론</Highlight> 플랫폼<br />
          ”
        </MainTitle>
        <Description>
          독서 모임에 참여하기 위해 금전적 부담을 느끼는 분들을 위해,<br />
          누구나 책을 읽고 자유롭게 의견을 나눌 수 있는<br />
          비용 없는 커뮤니티 플랫폼을 만들었습니다.
        </Description>
      </SecondSection>

      <Footer>
        <div><b>Github 🔗</b></div>
        <div>Developer @김민정 @장수원 @정혜영 @조은지 @최지우 @홍영준</div>
      </Footer>
    </Wrapper>
  );
}