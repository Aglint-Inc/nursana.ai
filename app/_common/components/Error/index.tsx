"use client";

import { AlertTriangle } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export const Error = (props: Props) => {
  return (
    <div className="flex h-[40vh] w-full max-w-3xl mx-auto flex-col items-center justify-center gap-3">
      <AlertTriangle className="h-10 w-10 text-red-600" strokeWidth={1} />
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-lg font-medium"> Something went wrong. </div>
        <div className="text-sm text-gray-500 text-center">{props.error.message}</div>
      </div>
    </div>
  );
};
