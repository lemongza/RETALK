import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 1280px;
  height: 784px;
  top: 0;
  left: 0;
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.7), 0px 20px 30px rgba(0,0,0,0.3), 0px 10px 50px rgba(0,0,0,0.2);
  border-radius: 5px 5px 5px 0;
`;

const Body = styled.div`
  position: absolute;
  top: 79px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #052210;
`;

const TabBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 79px;
  background: linear-gradient(180deg, #DFE1E5 0.6%, #DFE1E5 99.4%);
`;

const ReadTab = styled.div`
  position: absolute;
  top: 122px;
  left: 1004px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #FFF;
`;

const TalkTab = styled(ReadTab)`
  left: 1088px;
`;

export default function MainPage() {
  return (
    <Container>
      <TabBar>
        {/* Traffic lights and new-tab icon can be individual styled elements here */}
      </TabBar>
      <Body>
        <ReadTab>Read</ReadTab>
        <TalkTab>Talk</TalkTab>
        {/* Add toolbar, address bar, icons, buttons as nested styled components */}
      </Body>
    </Container>
  );
}