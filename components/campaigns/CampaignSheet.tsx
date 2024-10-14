"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type CampaignSheetProps = {
  children: React.ReactNode;
  title: string;
};

export function CampaignSheet({ children, title }: CampaignSheetProps) {
  const router = useRouter();

  return (
    <Sheet open={true} onOpenChange={() => router.push("/campaigns")}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
