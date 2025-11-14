"use client";

import React, { useState } from "react";
import c from "./MessageInput.module.css";

export const MessageInput = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={c.container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={c.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Напишите сообщение..."
      />
      <button
        type="submit"
        className={c.button}
      >
        Отправить
      </button>
    </form>
  );
};
