"use client";

import React, { useState } from "react";
import c from "./HistoryBurger.module.css";
import { HistoryItem } from "../HistoryItem/HistoryItem";

export const HistoryBurger = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`${c.btn} ${open ? c.open : ""}`}
      >
        ≡
      </button>

      {open && (
        <>
          <div className={c.overlay} onClick={() => setOpen(false)} />
          <div className={c.historyList}>
            <div className={c.historyHeader}>
              <button className={c.historyHeaderBtn}>
                New Chat
              </button>
            </div>
            <HistoryItem
              chat="Предыдущий чат 1"
              onClick={() => {}}
              onDelete={() => {}}
            />
            <HistoryItem
              chat="Предыдущий чат 2"
              onClick={() => {}}
              onDelete={() => {}}
            />
            <HistoryItem
              chat="Предыдущий чат 3"
              onClick={() => {}}
              onDelete={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
};
