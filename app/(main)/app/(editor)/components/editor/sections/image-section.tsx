import { useState, useCallback, useRef } from "react";
import { AlignLeft, AlignCenter, AlignRight, Upload, Trash2, Loader2, Pencil } from "lucide-react";

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
import { toast } from "sonner";
import { uploadFiles } from "@/lib/uploadthing";
import Image from "next/image";

export const ImageSection = ({
  state,
  setImage,
  setImageAlignment,
  // setImageFrame, // will be used when frame functionality is implemented
}: {
  state: Omit<EditorState, "isHydrated" | "isSaving">;
  setImage: (image: string | null) => void;
  setImageAlignment: (alignment: "left" | "center" | "right") => void;
  setImageFrame: (frame: keyof typeof IMAGE_FRAME) => void;
}) => {
  const { image, imageAlignment } = state;
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    uploadFile(file);
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

          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          setSelectedFile(null);
          setPreviewUrl(null);
          setUploadProgress(0);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [setImage, previewUrl]
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
              <DialogContent className="!max-w-sm" aria-describedby="upload-image-dialog">
                <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>

                {!selectedFile && !isUploading && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button onClick={handleUploadClick} className="w-full gap-2" variant="outline">
                      <Upload className="size-4" />
                      Upload Image
                    </Button>
                  </div>
                )}

                {selectedFile && previewUrl && (
                  <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="w-full h-full object-cover"
                    />
                    {isUploading && (
                      <>
                        <div
                          className="absolute inset-0 bg-success/50 transition-all duration-300 ease-linear"
                          style={{
                            clipPath: `inset(${100 - uploadProgress}% 0% 0% 0%)`,
                          }}
                        />
                        <div className="absolute inset-0 bg-muted-foreground/50 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2 text-background">
                            <Loader2 className="size-8 animate-spin" />
                            <span className="text-sm font-medium">
                              Uploading... {Math.round(uploadProgress)}%
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
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
                variant="ghost"
                className="gap-2"
                onClick={() => {
                  /* TODO: Implement frame selection */
                }}
              >
                <Pencil className="size-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
