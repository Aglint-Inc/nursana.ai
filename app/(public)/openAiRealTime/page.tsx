"use client";

import { RealtimeClient } from "@openai/realtime-api-beta";
import { type ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import { X, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { WavRecorder, WavStreamPlayer } from "@/audio/index";
import { Button } from "@/components/ui/button";
import { instructions } from "@/utils/audio/instructions";

import VoiceRing from "../_components/VoiceRing";

function OpenAiRealTimePage() {
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );

  const WS_URL = process.env.NEXT_PUBLIC_OPENAI_WS_URL;
  const client = new RealtimeClient({
    url: WS_URL,
  });

  const [items, setItems] = useState<ItemType[]>([]);

  const [isConnected, setIsConnected] = useState(false);

  /**
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events and more
   */
  useEffect(() => {
    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;

    client.updateSession({
      // Set instructions
      instructions: instructions,
      // Set transcription, otherwise we don't get user transcriptions back
      input_audio_transcription: { model: "whisper-1" },
      voice: "alloy",
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 1000,
      },
      model: "gpt-4o",
    });

    client.on("error", (event: any) => console.error(event));
    client.on("conversation.interrupted", async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        await client.cancelResponse(trackId, offset);
      }
    });

    client.on("conversation.updated", async (data: any) => {
      const { item, delta } = data;
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }
      setItems(items);
    });

    setItems(client.conversation.getItems());

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, []);
  /**
   * Connect to conversation:
   * WavRecorder taks speech input, WavStreamPlayer output, client is API client
   */
  const connectConversation = useCallback(async () => {
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    setIsConnected(true);
    setItems(client.conversation.getItems());

    // Connect to microphone
    await wavRecorder.begin("");

    // Connect to audio output
    await wavStreamPlayer.connect();

    // Connect to realtime API
    await client.connect();
    // get first response
    client.createResponse();

    // set turn detection to server_vad

    if (client.getTurnDetectionType() === "server_vad") {
      //@ts-ignore
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  }, []);

  /**
   * Disconnect and reset conversation state
   */
  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    setItems([]);

    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

  return (
    <div className="flex h-[100vh] items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Conversation</h2>
            </div>
            <VoiceRing
              wavRecorderRef={wavRecorderRef}
              wavStreamPlayerRef={wavStreamPlayerRef}
            />
          </div>
          <div className="p-4 border-t">
            <div className="space-y-4 max-h-[400px] overflow-auto">
              {[...items].map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">
                      {!message.formatted.tool && message.role === "user" && (
                        <div>
                          {message.formatted.transcript ||
                            message.formatted.text ||
                            "Loading speech ..."}
                        </div>
                      )}
                      {!message.formatted.tool &&
                        message.role === "assistant" && (
                          <div>
                            {message.formatted.transcript ||
                              message.formatted.text ||
                              "Loading transcript..."}
                          </div>
                        )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t flex justify-center items-center">
            <Button
              onClick={
                isConnected ? disconnectConversation : connectConversation
              }
            >
              {isConnected ? <X className="mr-2" /> : <Zap className="mr-2" />}
              {isConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenAiRealTimePage;
