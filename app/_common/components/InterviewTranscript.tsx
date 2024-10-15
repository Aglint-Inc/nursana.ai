import { Sparkle, User } from "lucide-react";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Message {
  role: "Agent" | "User";
  content: string;
}

interface InterviewTranscriptProps {
  transcript: string;
}

export function InterviewTranscript({ transcript }: InterviewTranscriptProps) {
  const messages: Message[] = parseTranscript(transcript);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "Agent" ? "justify-start" : "justify-start"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="">
                  {message.role === "Agent" ? (
                    <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
                      <div className="w-6 h-6 bg-secondary flex items-center justify-center rounded-sm">
                        <Sparkle size={16} strokeWidth={1.2} />
                      </div>
                      <div className="text-md">AI Interviewer</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-secondary flex items-center justify-center rounded-sm">
                        <User size={16} strokeWidth={1.2} />
                      </div>
                      <div className="text-md ">You</div>
                    </div>
                  )}
                </div>
                <Card
                  className={`border-none shadow-none ${
                    message.role === "Agent" ? "" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <p
                      className={`text-md whitespace-pre-wrap ${
                        message.role === "Agent" ? "text-muted-foreground" : ""
                      }`}
                    >
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function parseTranscript(transcript: string): Message[] {
  const messages: Message[] = [];
  const parts = transcript.split(/(?=Agent:|User:)/);

  for (const part of parts) {
    let content = part.slice(6).trim();
    if (content.endsWith("\\n")) {
      content = content.slice(0, -2);
    }

    if (part.startsWith("Agent:")) {
      messages.push({
        role: "Agent",
        content: content,
      });
    } else if (part.startsWith("User:")) {
      messages.push({
        role: "User",
        content: content,
      });
    }
  }

  return messages;
}
