import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainHeader = styled.div`
  width: 100%;
  height: 100%;
  //margin: 0 auto;
  background-color: #052210;
  display: flex;

  flex-direction: column;
  background-color: #052210;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88px;
  //width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 2px solid #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 80px;
  background: #052210;
  z-index: 10;
  padding: 0 30px;
`;
const RetalkLogo = styled.div`
  font-family: "Luckiest Guy";
  font-size: 2rem;
  color: #00c853;
  transform: translateY(7px); //묘하게 중심이 안맞아서 내렸어요
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
`;

const NavItem = styled.div`
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
`;

const LoginButton = styled.div`
  background: #00c853;
  height: 20px;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  color: white;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

export default function Banner() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleTalkClick = () => {
    navigate("/talk");
  };
  const handleMyClick = () => {
    navigate("/mypage");
  };
  const handleLoginClick = () => {
    if (token) {
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  const handleReadClick = () => {
    navigate("/read");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <MainHeader>
      <Header>
        <RetalkLogo onClick={handleHomeClick} style={{ cursor: "pointer" }}>
          RETALK
        </RetalkLogo>
        <NavGroup>
          <NavItem onClick={handleReadClick} style={{ cursor: "pointer" }}>
            Read
          </NavItem>
          <NavItem onClick={handleTalkClick} style={{ cursor: "pointer" }}>
            Talk
          </NavItem>{" "}
          <NavItem onClick={handleMyClick} style={{ cursor: "pointer" }}>
            Mypage
          </NavItem>
          <LoginButton onClick={handleLoginClick} style={{ cursor: "pointer" }}>
            {token ? "Logout" : "Login"}
          </LoginButton>
        </NavGroup>
      </Header>
    </MainHeader>
  );
}
