// src/pages/Home/MainPage.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axioInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardContainer = styled.div`
  //padding: 120px 5vw 0;
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
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const BoardItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #c4c4c4;
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
  text-align: left;
  flex: 1;
  padding-left: 30px;
  color: white;
`;

const MetaInfo = styled.div`
  //display: flex;

  color: #888;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  span:nth-child(1),
  span:nth-child(2) {
    text-align: right;
    width: 200px;
    gap: 10px;
  }

  span:nth-child(3) {
    text-align: right;
    width: 130px;
    gap: 10px;
  }

  span:nth-child(4) {
    text-align: right;
    width: 100px;

    gap: 10px;
  }

  span {
    color: #ccc;
    font-size: 0.9rem;
  }
`;

localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5qaUB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3NDkwMTE1NjYsImV4cCI6MTc0OTA5Nzk2Nn0.xmAMkYI-mHH6fO1q_5PqQlHo8PhvFuYf8t4xzyauN2Y"
);
export default function TalkBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    //스크롤바 상단으로 초기화
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/meetings", {
          headers: {
            Authorization: `Bearer ${token}`,
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
      post.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const navigate = useNavigate();

  return (
    <div styled={"margin:0 auto"}>
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
            <WriteButton onClick={() => navigate("/talk/write")}>
              글쓰기
            </WriteButton>
          </SearchGroup>
        </SearchContainer>

        <BoardList style={{ cursor: "default" }}>
          {sortedPosts.map((post) => {
            return (
              <BoardItem
                key={post.id}
                onClick={() => navigate(`/talk/${post.id}`)}
              >
                <span
                  style={{
                    width: 60,
                    textAlign: "center",
                    color: post.active ? "#00e676" : "#ff5252",
                  }}
                >
                  {post.active ? "모집중" : "마감"}
                </span>
                <Title>{post.title}</Title>
                <MetaInfo>
                  <span>{post.bookTitle}</span>
                  <span>{post.bookAuthor}</span>
                  <span>{post.startDate?.split("T")[0]}</span>
                </MetaInfo>
              </BoardItem>
            );
          })}
        </BoardList>
      </BoardContainer>
    </div>
  );
}
