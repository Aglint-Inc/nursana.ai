import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "Agent" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`flex ${
                message.role === "Agent" ? "flex-row" : "flex-row-reverse"
              } items-start max-w-[80%]`}
            >
              <Avatar
                className={`w-10 h-10 ${
                  message.role === "Agent" ? "mr-3" : "ml-3"
                }`}
              >
                <AvatarImage
                  src={
                    message.role === "Agent"
                      ? "/agent-avatar.png"
                      : "/user-avatar.png"
                  }
                />
                <AvatarFallback>
                  {message.role === "Agent" ? "A" : "U"}
                </AvatarFallback>
              </Avatar>
              <Card
                className={
                  message.role === "Agent" ? "bg-blue-50" : "bg-green-50"
                }
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
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
