import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border-radius: 16px;
`;

const PopupBox = styled.div`
  background-color: #222;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const ConfirmButton = styled.button`
  width: 100px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: white;
  border: none;
  background: #00c853;
  border-radius: 8px;
  cursor: pointer;
`;

export default function Popup({ MainText, SubText, onConfirm, onCancel }) {
  return (
    <Overlay>
      <PopupBox>
        <div>
          <p>{MainText}</p>
          <p>{SubText}</p>
        </div>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <ConfirmButton onClick={onCancel}>취소</ConfirmButton>
        </ButtonGroup>
      </PopupBox>
    </Overlay>
  );
}
