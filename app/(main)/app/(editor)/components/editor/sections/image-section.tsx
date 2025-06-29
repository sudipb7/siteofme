import Image from "next/image";
import { toast } from "sonner";
import { useState, useCallback, useRef, useMemo } from "react";
import { AlignLeft, AlignCenter, AlignRight, Upload, Trash2, Loader2, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";
import { EditorState } from "../../../lib/store";
import { IMAGE_FRAME } from "@/app/(main)/lib/constants";
import { getImageFrameStyles } from "../../../lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const ImageSection = ({
  state,
  setImage,
  setImageAlignment,
  setImageFrame,
  isMobile = false,
}: {
  isMobile?: boolean;
  state: Omit<EditorState, "isHydrated" | "isSaving">;
  setImage: (image: string | null) => void;
  setImageAlignment: (alignment: "left" | "center" | "right") => void;
  setImageFrame: (frame: keyof typeof IMAGE_FRAME) => void;
}) => {
  const { image, imageAlignment, fontSize } = state;
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [framePopoverOpen, setFramePopoverOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const frameOptions = useMemo(
    () =>
      Object.entries(IMAGE_FRAME).map(([key, value]) => ({
        key: key as keyof typeof IMAGE_FRAME,
        value,
        name: key
          .replaceAll("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, l => l.toUpperCase()),
        styles: getImageFrameStyles(value, fontSize),
      })),
    [fontSize]
  );

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB");
      return;
    }

    uploadFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        setUploadProgress(0);

        const res = await uploadFiles("imageUploader", {
          files: [file],
          onUploadProgress: ({ progress }) => {
            setUploadProgress(progress);
          },
        });

        if (res && res.length > 0) {
          const uploadedFile = res[0];

          setImage(uploadedFile.serverData?.fileUrl);

          toast.success("Image uploaded successfully!");
          setUploadDialogOpen(false);
          setUploadProgress(0);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [setImage]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={handleUploadClick}
                    className="w-full gap-2 relative overflow-hidden"
                    variant="outline"
                    disabled={isUploading}
                  >
                    {isUploading && (
                      <div
                        className="absolute inset-0 bg-muted transition-all ease-in-out"
                        style={{
                          width: `${Math.min(100, uploadProgress)}%`,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {isUploading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Uploading... {Math.round(Math.min(100, uploadProgress))}%
                        </>
                      ) : (
                        <>
                          <Upload className="size-4" />
                          Upload Image
                        </>
                      )}
                    </span>
                  </Button>
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
              <Popover modal={false} open={framePopoverOpen} onOpenChange={setFramePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Pencil className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 overflow-y-auto max-h-[450px]"
                  align={isMobile ? "end" : "start"}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {frameOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setImageFrame(option.key);
                          setFramePopoverOpen(false);
                        }}
                        className="flex items-center justify-center p-2 rounded-md hover:bg-accent outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1.5px] transition-all"
                      >
                        <Image
                          src={image}
                          loading="lazy"
                          alt="Frame preview"
                          width={parseInt(option.styles.width.replace("px", "")) / 1}
                          height={parseInt(option.styles.height.replace("px", "")) / 1}
                          className="max-w-full max-h-full"
                          style={{
                            ...option.styles,
                            width: `${parseInt(option.styles.width.replace("px", "")) / 1}px`,
                            height: `${parseInt(option.styles.height.replace("px", "")) / 1}px`,
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
