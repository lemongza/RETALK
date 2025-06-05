import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const MainHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: #052210;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: start;
  justify-content: space-between;
  line-height: 80px;
  background: #052210;
  z-index: 10;
  padding: 10px 30px;
`;

const RetalkLogo = styled.div`
  font-family: "Luckiest Guy";
  font-size: 2rem;
  color: #00c853;
  transform: translateY(7px);
  cursor: pointer;
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
  color: ${({ active }) => (active ? "#00c853" : "white")};
  display: flex;
  align-items: center;
  cursor: pointer;
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
  cursor: pointer;
`;

export default function Banner() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <MainHeader>
      <Header>
        <RetalkLogo onClick={handleNavigate("/")}>
          RETALK
        </RetalkLogo>
        <NavGroup>
          <NavItem
            onClick={handleNavigate("/read")}
            active={location.pathname.startsWith("/read")}
          >
            Read
          </NavItem>
          <NavItem
            onClick={handleNavigate("/talk")}
            active={location.pathname.startsWith("/talk")}
          >
            Talk
          </NavItem>
          <NavItem
            onClick={handleNavigate("/mypage")}
            active={location.pathname === "/mypage"}
          >
            Mypage
          </NavItem>
          <LoginButton onClick={() => {
            if (token) {
              localStorage.removeItem("token");
              alert("로그아웃 되었습니다.");
              navigate("/");
            } else {
              navigate("/login");
            }
          }}>
            {token ? "Logout" : "Login"}
          </LoginButton>
        </NavGroup>
      </Header>
    </MainHeader>
  );
}