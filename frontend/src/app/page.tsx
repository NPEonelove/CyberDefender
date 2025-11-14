"use client";

import { AuthButton } from "@/components/AuthButton/AuthButton";
import { ChatContainer } from "@/components/ChatContainer/ChatContainer";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { Scenarios } from "@/components/Scenarios/Scenarios";
import { authService } from "@/services/auth";
import { useEffect, useState } from "react";
import c from "./page.module.css";

declare global {
  interface Window {
    MaxWebApp?: {
      initData?: string;
      initDataUnsafe?: {
        user?: {
          id: number;
          first_name?: string;
          last_name?: string;
          username?: string;
        };
      };
      ready?: () => void;
      expand?: () => void;
    };
  }
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWebAppInitialized, setIsWebAppInitialized] = useState(false);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const maxRetries = 10;
        let attempts = 0;
        
        const tryInit = async () => {
          attempts++;
          
          if (window.MaxWebApp) {
            try {
              if (window.MaxWebApp.ready) {
                window.MaxWebApp.ready();
              }
              
              if (window.MaxWebApp.expand) {
                window.MaxWebApp.expand();
              }
              
              setIsWebAppInitialized(true);
              
              const userData = window.MaxWebApp.initDataUnsafe?.user;
              if (userData && userData.id) {
                await authService.signIn(userData.id);
                setIsAuthenticated(true);
              }
              
              return true;
            } catch (error) {
              console.error('Web app init error:', error);
            }
          }
          
          if (attempts < maxRetries) {
            setTimeout(tryInit, 500);
          }
          
          return false;
        };
        
        tryInit();
      }
    };

    setIsAuthenticated(authService.isAuthenticated());
    
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        initWebApp();
      } else {
        window.addEventListener('load', initWebApp);
      }
    }

    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', initWebApp);
      }
    };
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
