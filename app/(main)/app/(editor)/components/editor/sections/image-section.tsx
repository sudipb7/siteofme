import { useState } from "react";
import { AlignLeft, AlignCenter, AlignRight, Upload, Trash2, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditorState } from "../../../lib/store";
import { IMAGE_FRAME } from "@/app/(main)/lib/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ImageSection = ({
  state,
  setImage,
  setImageAlignment,
  setImageFrame,
}: {
  state: Omit<EditorState, "isHydrated" | "isSaving">;
  setImage: (image: string | null) => void;
  setImageAlignment: (alignment: "left" | "center" | "right") => void;
  setImageFrame: (frame: keyof typeof IMAGE_FRAME) => void;
}) => {
  const { image, imageAlignment, imageFrame } = state;
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <div className="space-y-2.5 border-b px-4 py-6">
      <div className="flex items-center justify-between">
        <h3 className="md:text-base text-lg font-semibold">Image</h3>
        {image && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setImage(null)}
            className="hover:bg-destructive/10 hover:text-destructive/70"
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {!image ? (
          <div className="flex items-center justify-between">
            <span className="md:text-sm text-base font-medium">File</span>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="size-4" />
                  Upload file
                </Button>
              </DialogTrigger>
              <DialogContent className="!max-w-md" aria-describedby="upload-image-dialog">
                <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                {/* Dialog content will be implemented later */}
                <div className="p-8 text-center text-muted-foreground">
                  Upload functionality coming soon...
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="md:text-sm text-base font-medium">Position</span>
              <ToggleGroup
                type="single"
                value={imageAlignment}
                onValueChange={value =>
                  value && setImageAlignment(value as "left" | "center" | "right")
                }
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

            <div className="flex items-center justify-between">
              <span className="md:text-sm text-base font-medium">Frame</span>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  /* TODO: Implement frame selection */
                }}
              >
                <Edit className="size-4" />
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
