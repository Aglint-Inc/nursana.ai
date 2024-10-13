import { useRef, useCallback, useState, useEffect } from 'react';
import { RetellWebClient } from "retell-client-js-sdk";

type RetellClient = RetellWebClient;

declare global {
  interface Window {
    retellWebClient?: RetellClient;
  }
}

export function useRetellClient() {
  const retellClientRef = useRef<RetellClient | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    if (!retellClientRef.current) {
      retellClientRef.current = new RetellWebClient();
      setIsClientReady(true);
    }
  }, []);

  const startCall = useCallback(async (accessToken: string) => {
    if (retellClientRef.current) {
      try {
        await retellClientRef.current.startCall({
          accessToken: accessToken,
        });
        console.log("Call started using Retell Web Client.");
      } catch (error) {
        console.error("Failed to start call:", error);
        throw error;
      }
    } else {
      console.error("Retell Web Client is not initialized.");
      throw new Error("Retell Web Client is not initialized.");
    }
  }, []);

  const stopCall = useCallback(() => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall();
      console.log("Call stopped using Retell Web Client.");
    } else {
      console.error("Retell Web Client is not initialized.");
    }
  }, []);

  const setupEventListeners = useCallback((callbacks: {
    onCallStarted?: () => void;
    onCallEnded?: () => void;
    onAgentStartTalking?: () => void;
    onAgentStopTalking?: () => void;
    onUpdate?: (update: any) => void;
    onError?: (error: any) => void;
  }) => {
    if (retellClientRef.current) {
      if (callbacks.onCallStarted) {
        retellClientRef.current.on("call_started", callbacks.onCallStarted);
      }
      if (callbacks.onCallEnded) {
        retellClientRef.current.on("call_ended", callbacks.onCallEnded);
      }
      if (callbacks.onAgentStartTalking) {
        retellClientRef.current.on("agent_start_talking", callbacks.onAgentStartTalking);
      }
      if (callbacks.onAgentStopTalking) {
        retellClientRef.current.on("agent_stop_talking", callbacks.onAgentStopTalking);
      }
      if (callbacks.onUpdate) {
        retellClientRef.current.on("update", callbacks.onUpdate);
      }
      if (callbacks.onError) {
        retellClientRef.current.on("error", callbacks.onError);
      }
    }
  }, []);

  return {
    isClientReady,
    startCall,
    stopCall,
    setupEventListeners,
  };
}
