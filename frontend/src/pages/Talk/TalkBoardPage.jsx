// src/pages/Home/MainPage.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axioInstance";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 200vh; /* 상하 합친 높이 */
  background: #052210;
  position: relative;
`;

const Header = styled.div`
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
`;

const RetalkLogo = styled.div`
  font-family: "Luckiest Guy";
  font-size: 2rem;
  color: #00c853;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 200px;
  text-align: end;
  padding-bottom: 5px;
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
  height: 40px;
  padding: 0 10px;

  &:hover {
    color: #00c853;
  }
`;

const LoginButton = styled.div`
  background: #00c853;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  color: white;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;

  &:hover {
    background: #00b248;
  }
`;

const Footer = styled.footer`
  font-family: "Pretendard";
  font-size: 1rem;
  color: #d9d9d9;
  position: absolute;
  bottom: 20px;
  left: 68px;
`;

const BoardContainer = styled.div`
  padding: 120px 5vw 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #00c853;
  background: transparent;
  color: white;
  width: 300px;
  &::placeholder {
    color: #888;
  }
`;

const SortSelect = styled.select`
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: "Pretendard";
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
  padding-right: 40px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #1a321f;
    color: white;
    padding: 12px;
    font-size: 0.9rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &:checked {
      background: rgba(255, 255, 255, 0.1);
      &::before {
        content: "✓ ";
        color: #00c853;
      }
    }
  }
`;

const WriteButton = styled.button`
  background: #00c853;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-family: "Pretendard";
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #00b248;
  }
`;

const BoardList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const BoardItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 20px;
  color: #888;
  font-size: 0.9rem;
`;

// // 더미 데이터
// const dummyPosts = [
//   {
//     id: 1,
//     title: "빛과 실 외고 토론하실 분 구해요",
//     author: "은지123",
//     date: "2024-03-20",
//     views: 42,
//   },
//   {
//     id: 2,
//     title: "토론 같이 하실 분 찾습니다",
//     author: "토론왕",
//     date: "2024-03-19",
//     views: 38,
//   },
//   {
//     id: 3,
//     title: "빛과 실 독서토론 하실 분~",
//     author: "책벌레",
//     date: "2024-03-18",
//     views: 65,
//   },
//   {
//     id: 4,
//     title: "독서토론 초보 환영합니다",
//     author: "독서매니아",
//     date: "2024-03-17",
//     views: 27,
//   },
// ];

export default function TalkBoardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/meetings", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qaUB0ZXN0LmNvbSIsImlhdCI6MTc0ODQ5NjE3NCwiZXhwIjoxNzQ4NTgyNTc0fQ.r7uOraHWogDXQb4sreFLWNzLohi96g1SO2Wz83R-zF0",
          },
        });

        if (isFirstRender) {
          console.log("=== 불러온 데이터 ===");
          console.log(response.data);
          setIsFirstRender(false);
        }

        setPosts(response.data);
      } catch (error) {
        console.error(
          "게시글 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };
    fetchPosts();
  }, [isFirstRender]);

  // 검색 기능
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬 기능
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "early") {
      return new Date(a.startDate) - new Date(b.startDate);
    }
    return 0;
  });

  return (
    <Wrapper>
      <Header>
        <RetalkLogo>RETALK</RetalkLogo>
        <NavGroup>
          <NavItem>Read</NavItem>
          <NavItem>Talk</NavItem>
          <LoginButton>Login</LoginButton>
        </NavGroup>
      </Header>

      <BoardContainer>
        <SearchContainer>
          <SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="early">빠른시작일순</option>
          </SortSelect>
          <SearchGroup>
            <SearchInput
              placeholder="제목 또는 작성자 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <WriteButton>글쓰기</WriteButton>
          </SearchGroup>
        </SearchContainer>

        <BoardList>
          {sortedPosts.map((post) => {
            return (
              <BoardItem key={post.id}>
                <Title>{post.title}</Title>
                <MetaInfo>
                  <span>{post.host?.name}</span>
                  <span>{post.bookTitle}</span>
                  <span>{post.bookAuthor}</span>
                  <span>{post.startDate?.split("T")[0]}</span>
                  <span>조회 {post.views || 0} </span>
                </MetaInfo>
              </BoardItem>
            );
          })}
        </BoardList>
      </BoardContainer>

      <Footer>
        <div>
          <b>Github 🔗</b>
        </div>
        <div>Developer @김민정 @장수원 @정혜영 @조은지 @최지우 @홍영준</div>
      </Footer>
    </Wrapper>
  );
}
