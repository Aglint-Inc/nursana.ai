export interface Message {
  type: "error" | "success";
  text: string;
}

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-foreground border-l-2 border-foreground px-4">
          {message.text}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
          {message.text}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.text}</div>
      )}
    </div>
  );
}
