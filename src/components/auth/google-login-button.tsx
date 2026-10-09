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
      width: 280,
    });
  }, [ready]);

  if (!googleClientId) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3" aria-disabled={disabled}>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
