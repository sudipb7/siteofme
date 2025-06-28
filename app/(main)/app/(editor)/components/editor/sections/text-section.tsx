import { useMemo } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  // ChevronDown
} from "lucide-react";

import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
import { EditorState } from "../../../lib/store";
import {
  FONT_FAMILY,
  FONT_SIZE,
  //  COLOR
} from "@/app/(main)/lib/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SelectWithSearch, type SelectOption } from "@/components/ui/select-with-search";

export const TextSection = ({
  state,
  setFontFamily,
  setFontSize,
  setTextAlign,
}: {
  state: Omit<EditorState, "isHydrated" | "isSaving">;
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: keyof typeof FONT_SIZE) => void;
  setTextAlign: (textAlign: "left" | "center" | "right") => void;
}) => {
  const { fontFamily, fontSize, textAlign } = state;

  const fontOptions: SelectOption[] = useMemo(
    () =>
      Object.entries(FONT_FAMILY).map(([key, value]) => ({
        value: value,
        label: key
          .replaceAll("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, l => l.toUpperCase()),
      })),
    []
  );

  // const colorOptions: SelectOption[] = useMemo(
  //   () =>
  //     Object.entries(COLOR).map(([key, value]) => ({
  //       value: value,
  //       label: key
  //         .replaceAll("_", " ")
  //         .toLowerCase()
  //         .replace(/\b\w/g, l => l.toUpperCase()),
  //     })),
  //   []
  // );

  return (
    <div className="space-y-2.5 border-b px-4 py-6">
      <h3 className="md:text-base text-lg font-semibold">Text</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="md:text-sm text-base font-medium">Font</span>
          <div className="w-40">
            <SelectWithSearch
              isFontFamilySelect
              options={fontOptions}
              value={fontFamily}
              onValueChange={setFontFamily}
              placeholder="Select font"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="md:text-sm text-base font-medium">Size</span>
          <ToggleGroup
            type="single"
            value={fontSize.toString()}
            onValueChange={value => value && setFontSize(value as keyof typeof FONT_SIZE)}
          >
            {Object.entries(FONT_SIZE).map(([key, size], index) => (
              <ToggleGroupItem
                key={key}
                value={size.toString()}
                aria-label={`Set font size to ${key}`}
                className={cn(
                  "border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3 md:text-sm text-base",
                  index !== 0 && "border-l-0"
                )}
              >
                {key}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex items-center justify-between">
          <span className="md:text-sm text-base font-medium">Align</span>
          <ToggleGroup
            type="single"
            value={textAlign}
            onValueChange={value => value && setTextAlign(value as "left" | "center" | "right")}
          >
            <ToggleGroupItem
              value="left"
              aria-label="Align left"
              className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignLeft className="size-5 md:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              aria-label="Align center"
              className="border-y bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignCenter className="size-5 md:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              aria-label="Align right"
              className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignRight className="size-5 md:size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Color</span>
          <div className="w-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="text-sm">
                    {colorOptions.find(opt => opt.value === color)?.label || "Select color"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {colorOptions.map(option => (
                  <DropdownMenuItem key={option.value} onClick={() => setColor(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div> */}
      </div>
    </div>
  );
};
