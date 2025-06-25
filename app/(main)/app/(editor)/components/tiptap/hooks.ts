import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";

export const useLinkState = (editor: Editor | null) => {
  const [addLinkUrl, setAddLinkUrl] = useState("");
  const [editLinkUrl, setEditLinkUrl] = useState("");
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [savedSelection, setSavedSelection] = useState<{ from: number; to: number } | null>(null);

  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAddingLink) {
          setIsAddingLink(false);
          setAddLinkUrl("");
          setSavedSelection(null);
        } else if (isEditingLink) {
          setIsEditingLink(false);
          const currentUrl = editor.getAttributes("link").href || "";
          setEditLinkUrl(currentUrl);
          editor.commands.blur();
        } else {
          editor.commands.blur();
        }
      }
    };

    const handleFocusOut = () => {
      if (isAddingLink) {
        setIsAddingLink(false);
        setAddLinkUrl("");
        setSavedSelection(null);
      }
      if (isEditingLink) {
        setIsEditingLink(false);
        const currentUrl = editor.getAttributes("link").href || "";
        setEditLinkUrl(currentUrl);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    editor.view.dom.addEventListener("blur", handleFocusOut);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      editor.view.dom.removeEventListener("blur", handleFocusOut);
    };
  }, [editor, isAddingLink, isEditingLink]);

  return {
    savedSelection,
    setSavedSelection,
    isEditingLink,
    setIsEditingLink,
    editLinkUrl,
    setEditLinkUrl,
    isAddingLink,
    setIsAddingLink,
    addLinkUrl,
    setAddLinkUrl,
  };
};
