import styled from "styled-components";

const Footer = styled.div`
  transform: translateY(88px);
  max-width: 1200px;
  width: 100%;
  height: 120px;
  display: flex;
  border-top: 2px solid #bbbbbb;
  flex-direction: column;
  align-items: start;
  margin: 40px auto 0 auto;
  padding: 30px;
  box-sizing: border-box;
`;
const Text = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  word-spacing: 0.5cap;
  color: #d9d9d9;
`;

const GitHubIcon = styled.svg`
  margin-right: 6px;
  fill: currentColor;
`;

export default function FooterBanner() {
  return (
    <Footer>
      <div>
        <Text
          href="https://github.com/zelatndnjs/RETALK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.624-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
          </GitHubIcon>
          <span style={{ marginLeft: "6px" }}>Github</span>
        </Text>
      </div>
      <Text>Developer @김민정 @장수원 @정혜영 @조은지 @최지우 @홍영준</Text>
    </Footer>
  );
}
