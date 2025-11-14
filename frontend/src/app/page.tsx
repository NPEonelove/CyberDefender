"use client";

import { AuthButton } from "@/components/AuthButton/AuthButton";
import { ChatContainer } from "@/components/ChatContainer/ChatContainer";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { Scenarios } from "@/components/Scenarios/Scenarios";
import { authService } from "@/services/auth";
import { useEffect, useState } from "react";
import c from "./page.module.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());

    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={c.page}>
      <header className={c.header}>
        <h1 className={c.aiName}>CyberEDU</h1>
        <div className={c.authButtonContainer}>
          <AuthButton />
        </div>
      </header>

      <Scenarios isAuthenticated={isAuthenticated} />

      <ChatContainer />

      <MessageInput />
    </div>
  );
}
