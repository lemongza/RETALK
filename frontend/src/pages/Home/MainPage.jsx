// src/pages/Home/MainPage.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 200vh;
  background: #052210;
  position: relative;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: #052210;
  z-index: 10;
  box-sizing: border-box;
`;

const RetalkLogo = styled.div`
  font-family: 'Luckiest Guy';
  font-size: clamp(1.2rem, 2vw, 2.5rem);
  color: #00C853;
  cursor: pointer;
  white-space: nowrap;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1vw;
  max-width: 50vw;
  justify-content: flex-end;
`;

const NavItem = styled.div`
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
`;

const AuthButton = styled.button`
  padding: 0.4rem 1rem;
  background: #00C853;
  border: none;
  border-radius: 20px;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
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
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleAuthClick = () => {
    if (token) {
      localStorage.removeItem('token');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const goToMain = () => {
    if (window.location.pathname === '/') {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <RetalkLogo onClick={goToMain}>RETALK</RetalkLogo>
        <NavGroup>
          <NavItem>Read</NavItem>
          <NavItem>Talk</NavItem>
          <AuthButton onClick={handleAuthClick}>
            {token ? 'Logout' : 'Login'}
          </AuthButton>
        </NavGroup>
      </HeaderWrapper>

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