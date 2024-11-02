import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CalendarSlotNotAvailableProps = {
  className?: string;
};

export default function CalendarSlotNotAvailable({
  className,
}: CalendarSlotNotAvailableProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "flex items-center justify-center rounded h-auto flex-grow cursor-not-allowed",
              className
            )}
            style={{
              background:
                "repeating-linear-gradient(-45deg, var(--disabled-gradient-background), var(--disabled-gradient-background) 2.5px, var(--disabled-gradient-foreground) 2.5px, var(--disabled-gradient-foreground) 5px)",
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Slots not available</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
