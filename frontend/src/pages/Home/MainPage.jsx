// src/pages/Home/MainPage.jsx
import styled from "styled-components";
import { useEffect } from "react";

const FirstSection = styled.section`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10vw;
  padding-left: 10vw;
  padding-top: 5vh;
`;

const TitleBlock = styled.div`
  text-align: right;
  color: white;
  font-family: "Luckiest Guy";
  font-size: 6vw;
  line-height: 1.2;
  margin-bottom: 8vh; /* Reduce bottom margin */
`;

const Highlight = styled.span`
  color: #00c853;
`;

const SecondSection = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  color: white;
  padding-bottom: 10vh; /* Remove extra margin if any */
`;

const SubTitle = styled.div`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MainTitle = styled.div`
  font-family: "Pretendard";
  font-size: 4rem;
  line-height: 1.3;
`;

const Description = styled.div`
  font-family: "Pretendard";
  font-size: 1rem;
  line-height: 1.5;
  color: #ccc;
`;

export default function MainPage() {
  useEffect(() => {
    //스크롤바 상단으로 초기화
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <FirstSection>
        <TitleBlock>
          <div>INTERACTIVE</div>
          <div>BOOK CLUB PLATFORM</div>
          <div>
            <Highlight>READ & TALK</Highlight>
          </div>
        </TitleBlock>
      </FirstSection>
      <SecondSection>
        <SubTitle>
          독서에 관심은 많지만
          <br /> 모임 참여가 부담스러우셨나요?
        </SubTitle>
        <MainTitle>
          “<br />
          <Highlight>누구나</Highlight> 자유롭게 참여하는
          <br />
          <Highlight>독서 토론</Highlight> 플랫폼
          <br />”
        </MainTitle>
        <Description>
          독서 모임에 참여하기 위해 금전적 부담을 느끼는 분들을 위해,
          <br />
          누구나 책을 읽고 자유롭게 의견을 나눌 수 있는
          <br />
          비용 없는 커뮤니티 플랫폼을 만들었습니다.
        </Description>
      </SecondSection>
    </div>
  );
}
