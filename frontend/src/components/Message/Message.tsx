import React from "react";
import c from "./Message.module.css";

interface MessageProps {
  text: string;
  sender: "user" | "ai";
  isLoading?: boolean;
}

export const Message = ({ text, sender, isLoading }: MessageProps) => {
  return (
    <div
      className={`${c.messageWrapper} ${
        sender === "user" ? c.userWrapper : c.aiWrapper
      }`}
    >
      <div className={`${c.message} ${sender === "user" ? c.user : c.ai}`}>
        <div className={c.content}>
          {isLoading ? (
            <div className={c.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className={c.text}>
              <span>{text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
