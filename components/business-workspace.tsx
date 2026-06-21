"use client";

import { useCallback, useEffect, useRef } from "react";
import { AppShell } from "@/components/app-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const FRAME_ORIGIN = typeof window === "undefined" ? "" : window.location.origin;

export function BusinessWorkspace() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const sendSession = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    const frame = frameRef.current?.contentWindow;
    if (!supabase || !frame) return;

    const { data } = await supabase.auth.getSession();
    frame.postMessage(
      {
        type: "business-methodology:auth",
        accessToken: data.session?.access_token ?? null
      },
      FRAME_ORIGIN
    );
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.origin === FRAME_ORIGIN &&
        event.source === frameRef.current?.contentWindow &&
        event.data?.type === "business-methodology:ready"
      ) {
        void sendSession();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendSession]);

  return (
    <AppShell>
      <iframe
        ref={frameRef}
        className="business-workspace-frame"
        src="/business-oferta.html"
        title="Extracción del método La Diana"
        onLoad={() => void sendSession()}
      />
    </AppShell>
  );
}
