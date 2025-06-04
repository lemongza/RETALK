import React, { useEffect, useState } from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`common-button ${className}`}
      style={{
        width: "100%",
        padding: "1%",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        border: "none",
        background: "#00c853",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

const HalfButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,

  ...props
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "50%",
        padding: "1%",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        border: "none",
        background: "#00c853",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

const HalfRedButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,

  ...props
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "50%",
        padding: "1%",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        border: "none",
        background: "#ff453a",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export { HalfButton, Button, HalfRedButton };
