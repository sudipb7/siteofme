import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  LinkIcon,
  Trash2Icon,
  Pencil,
  CheckIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface BubbleMenuContentProps {
  editor: Editor;
  openLinkOnClick: boolean;
  linkState: {
    isEditingLink: boolean;
    editLinkUrl: string;
    setEditLinkUrl: (url: string) => void;
    isAddingLink: boolean;
    addLinkUrl: string;
    setAddLinkUrl: (url: string) => void;
  };
  handlers: {
    handleAddLinkClick: (e: React.MouseEvent) => void;
    handleEditLink: (e: React.MouseEvent) => void;
    handleRemoveLink: (e: React.MouseEvent) => void;
  };
  getActiveFormats: () => string[];
  handleFormatChange: (values: string[], editor: Editor) => void;
}

export const BubbleMenuContent: React.FC<BubbleMenuContentProps> = ({
  editor,
  openLinkOnClick,
  linkState,
  handlers,
  getActiveFormats,
  handleFormatChange,
}) => {
  const { isEditingLink, editLinkUrl, setEditLinkUrl, isAddingLink, addLinkUrl, setAddLinkUrl } =
    linkState;
  const { handleAddLinkClick, handleEditLink, handleRemoveLink } = handlers;

  const createMockEvent = () =>
    ({
      preventDefault: () => {},
      stopPropagation: () => {},
    }) as React.MouseEvent;

  if (editor.isActive("link") && !openLinkOnClick) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={editLinkUrl}
          onChange={e => setEditLinkUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={!isEditingLink}
          className="h-8 w-48 text-sm disabled:opacity-70"
          onKeyDown={e => {
            if (e.key === "Enter" && isEditingLink) {
              e.preventDefault();
              handleEditLink(createMockEvent());
            }
          }}
          autoFocus={isEditingLink}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEditLink}
          className="border bg-background hover:bg-accent hover:text-accent-foreground md:h-8 h-9 px-3"
          aria-label={isEditingLink ? "Save link" : "Edit link"}
        >
          {isEditingLink ? (
            <CheckIcon className="size-5 md:size-4" />
          ) : (
            <Pencil className="size-5 md:size-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveLink}
          className="border bg-background hover:bg-accent hover:text-accent-foreground md:h-8 h-9 px-3"
          aria-label="Remove link"
        >
          <Trash2Icon className="size-5 md:size-4" />
        </Button>
      </div>
    );
  }

  if (isAddingLink) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={addLinkUrl}
          onChange={e => setAddLinkUrl(e.target.value)}
          placeholder="https://example.com"
          className="h-8 w-48 text-sm"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLinkClick(createMockEvent());
            }
          }}
          autoFocus
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddLinkClick}
          className="border bg-background hover:bg-accent hover:text-accent-foreground md:h-8 h-9 px-3"
          aria-label="Save link"
        >
          <CheckIcon className="size-5 md:size-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <ToggleGroup
        type="multiple"
        value={getActiveFormats()}
        onValueChange={values => handleFormatChange(values, editor)}
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
        >
          <BoldIcon className="size-5 md:size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className="border-y bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
        >
          <ItalicIcon className="size-5 md:size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strike"
          aria-label="Toggle strikethrough"
          className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
        >
          <StrikethroughIcon className="size-5 md:size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleAddLinkClick}
        className="border ml-1 bg-background hover:bg-accent hover:text-accent-foreground md:h-8 h-9 px-3"
        aria-label="Add link"
      >
        Add link
        <LinkIcon className="size-5 md:size-4" />
      </Button>
    </>
  );
};
