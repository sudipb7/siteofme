import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "../../../lib/store";
import { BACKGROUND_COLOR } from "@/app/(main)/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const BackgroundSection = () => {
  const [open, setOpen] = useState(false);
  const { backgroundColor, setBackgroundColor } = useEditorStore();

  const colorOptions = useMemo(
    () =>
      Object.entries(BACKGROUND_COLOR).map(([key, value]) => ({
        color: value,
        name: key
          .replaceAll("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, l => l.toUpperCase()),
      })),
    []
  );

  return (
    <div className="space-y-2.5 px-4 py-6 border-b">
      <h3 className="md:text-base text-lg font-semibold">Background</h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="md:text-sm text-base font-medium">Color</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <div className="size-4 rounded-sm border" style={{ backgroundColor }} />
                <span className="font-mono text-sm">{backgroundColor.toUpperCase()}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="grid grid-cols-6 gap-3">
                {colorOptions.map(({ color, name }) => (
                  <button
                    key={color}
                    onClick={() => {
                      setBackgroundColor(color);
                      setOpen(false);
                    }}
                    className={cn(
                      "size-8 rounded-md focus-visible:ring-[1.5px] hover:opacity-85 focus-visible:ring-ring/50 focus-visible:ring-offset-background outline-none transition-all",
                      color === "#ffffff" && "border"
                    )}
                    style={{ backgroundColor: color }}
                    title={name}
                    aria-label={`Set background to ${name}`}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
