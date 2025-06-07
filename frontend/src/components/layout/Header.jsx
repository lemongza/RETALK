import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const MainHeader = styled.div`
  width: 100%;
  background-color: #052210;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 30px;
`;

const RetalkLogo = styled.div`
  font-family: "Luckiest Guy";
  font-size: 2rem;
  transform: translateY(10px);
  color: #00c853;
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
  cursor: pointer;
  color: ${(props) => (props.active ? "#00c853" : "white")};
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
  const role = localStorage.getItem("role");

  const handleNavigate = (path) => navigate(path);

  return (
    <MainHeader>
      <HeaderInner>
        <RetalkLogo onClick={() => handleNavigate("/")}>RETALK</RetalkLogo>
        <NavGroup>
          <NavItem
            onClick={() => handleNavigate("/read")}
            active={location.pathname.startsWith("/read")}
          >
            Read
          </NavItem>
          <NavItem
            onClick={() => handleNavigate("/talk")}
            active={location.pathname.startsWith("/talk")}
          >
            Talk
          </NavItem>
          <NavItem
            onClick={() => handleNavigate("/mypage")}
            active={location.pathname.startsWith("/mypage")}
          >
            Mypage
          </NavItem>

          {role === "ADMIN" && (
            <NavItem
              onClick={() => handleNavigate("/admin")}
              active={location.pathname.startsWith("/admin")}
            >
              Admin
            </NavItem>
          )}

          <LoginButton
            onClick={() => {
              if (token) {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("nickname");
                localStorage.removeItem("role");
                alert("로그아웃 되었습니다.");
                navigate("/");
              } else {
                navigate("/login");
              }
            }}
          >
            {token ? "Logout" : "Login"}
          </LoginButton>
        </NavGroup>
      </HeaderInner>
    </MainHeader>
  );
}
