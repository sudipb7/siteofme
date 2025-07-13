import { Editor } from "@tiptap/react";

export const createLinkHandlers = (
  editor: Editor | null,
  linkState: {
    savedSelection: { from: number; to: number } | null;
    setSavedSelection: (selection: { from: number; to: number } | null) => void;
    isEditingLink: boolean;
    setIsEditingLink: (editing: boolean) => void;
    editLinkUrl: string;
    setEditLinkUrl: (url: string) => void;
    isAddingLink: boolean;
    setIsAddingLink: (adding: boolean) => void;
    addLinkUrl: string;
    setAddLinkUrl: (url: string) => void;
  }
) => {
  const {
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
  } = linkState;

  const handleAddLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editor) return;

    if (isAddingLink) {
      if (addLinkUrl.trim() && savedSelection) {
        editor
          .chain()
          .focus()
          .setTextSelection({ from: savedSelection.from, to: savedSelection.to })
          .setLink({ href: addLinkUrl.trim() })
          .run();
      }

      setIsAddingLink(false);
      setAddLinkUrl("");
      setSavedSelection(null);
    } else {
      const selection = editor.state.selection;
      setSavedSelection({ from: selection.from, to: selection.to });
      setAddLinkUrl("");
      setIsAddingLink(true);
    }
  };

  const handleEditLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editor) return;

    if (isEditingLink) {
      const selection = editor.state.selection;
      setSavedSelection({ from: selection.from, to: selection.to });

      if (editLinkUrl.trim()) {
        editor
          .chain()
          .focus()
          .setTextSelection({
            from: savedSelection?.from || selection.from,
            to: savedSelection?.to || selection.to,
          })
          .setLink({ href: editLinkUrl.trim() })
          .run();
      }

      setIsEditingLink(false);
      setEditLinkUrl("");
      setSavedSelection(null);
    } else {
      const currentUrl = editor.getAttributes("link").href || "";
      setEditLinkUrl(currentUrl);
      setIsEditingLink(true);
    }
  };

  const handleRemoveLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  return {
    handleAddLinkClick,
    handleEditLink,
    handleRemoveLink,
  };
};
