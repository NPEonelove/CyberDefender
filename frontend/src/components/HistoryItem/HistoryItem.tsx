import React from "react";
import c from "./HistoryItem.module.css";

interface HistoryItemProps {
  chat: string;
  onClick: () => void;
  onDelete: () => void;
}

export const HistoryItem = ({ chat, onClick, onDelete }: HistoryItemProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };
  return (
    <div className={c.historyItem} onClick={onClick}>
      <span className={c.chat}>{chat}</span>
      <button onClick={handleDelete} className={c.deleteBtn}>
        🗑️
      </button>
    </div>
  );
};
