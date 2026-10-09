"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type: string;
      theme: string;
      size: string;
      text: string;
      width: number;
    },
  ) => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleId;
      };
    };
  }
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

export function GoogleLoginButton({
  disabled,
  onCredential,
}: {
  disabled?: boolean;
  onCredential: (idToken: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCredentialRef = useRef(onCredential);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    const container = containerRef.current;
    const googleId = window.google?.accounts.id;
    if (!googleClientId || !ready || !container || !googleId) {
      return;
    }

    container.innerHTML = "";
    googleId.initialize({
      client_id: googleClientId,
      callback: (response) => {
        if (!response.credential) {
          return;
        }
        onCredentialRef.current(response.credential);
      },
    });
    googleId.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      width: Math.max(container.clientWidth, 180),
    });
  }, [ready]);

  if (!googleClientId) {
    return null;
  }

  return (
    <div className={`relative h-11 ${disabled ? "pointer-events-none opacity-60" : ""}`}>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div className="pointer-events-none flex h-11 items-center justify-center gap-2 rounded-full border bg-background text-sm font-medium">
        <GoogleMark />
        Google
      </div>
      <div ref={containerRef} className="absolute inset-0 z-10 overflow-hidden" style={{ opacity: 0 }} />
    </div>
  );
}
