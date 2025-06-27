import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";

import { cn } from "@/lib/utils";
import { Site } from "@/db/schema";
import { useEditorStore } from "../../lib/store";
import { mapSiteToStoreFormat } from "../../lib/utils";
import { useLinkState } from "./hooks";
import { createLinkHandlers } from "./link-handlers";
import { BubbleMenuContent } from "./bubble-menu-content";

interface TipTapEditorProps {
  openLinkOnClick?: boolean;
  site?: Site | null;
}

export const TipTapEditor = ({ openLinkOnClick = false, site }: TipTapEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const storeState = useEditorStore();
  const { setContent } = storeState;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getInitialContent = () => {
    if (storeState.isHydrated) {
      return storeState.content;
    }

    const siteData = mapSiteToStoreFormat(site || null);
    return siteData.content;
  };

  const currentContent = getInitialContent();

  const editor = useEditor({
    content: currentContent,
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class: "outline-none space-y-4",
        placeholder: "Start typing...",
      },
    },
    extensions: [
      StarterKit.configure({
        blockquote: false,
        code: false,
        codeBlock: false,
        bulletList: false,
        heading: false,
        listItem: false,
        horizontalRule: false,
        orderedList: false,
        dropcursor: false,
        gapcursor: false,
        hardBreak: false,
      }),
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: openLinkOnClick,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        HTMLAttributes: {
          class: cn("underline underline-offset-2", openLinkOnClick && "cursor-pointer"),
        },
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            const allowedProtocols = ctx.protocols.map(p => (typeof p === "string" ? p : p.scheme));

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            return true;
          } catch {
            return false;
          }
        },
      }),
    ],
    immediatelyRender: false,
    onCreate: () => {
      setEditorReady(true);
    },
    onUpdate: ({ editor }) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setContent(editor.getHTML());
      }, 300);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editor && storeState.isHydrated && editor.getHTML() !== storeState.content) {
      editor.commands.setContent(storeState.content);
    }
  }, [editor, storeState.isHydrated, storeState.content]);

  const linkState = useLinkState(editor);
  const linkHandlers = createLinkHandlers(editor, linkState);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const getActiveFormats = () => {
    if (!editor) return [];
    const formats = [];
    if (editor.isActive("bold")) formats.push("bold");
    if (editor.isActive("italic")) formats.push("italic");
    if (editor.isActive("strike")) formats.push("strike");
    return formats;
  };

  const handleFormatChange = useCallback((values: string[], editor: Editor) => {
    if (values.includes("bold") && !editor.isActive("bold")) {
      editor.chain().focus().toggleBold().run();
    } else if (!values.includes("bold") && editor.isActive("bold")) {
      editor.chain().focus().toggleBold().run();
    }

    if (values.includes("italic") && !editor.isActive("italic")) {
      editor.chain().focus().toggleItalic().run();
    } else if (!values.includes("italic") && editor.isActive("italic")) {
      editor.chain().focus().toggleItalic().run();
    }

    if (values.includes("strike") && !editor.isActive("strike")) {
      editor.chain().focus().toggleStrike().run();
    } else if (!values.includes("strike") && editor.isActive("strike")) {
      editor.chain().focus().toggleStrike().run();
    }
  }, []);

  if (!isMounted || !editor || !editorReady) {
    return (
      <div
        className="outline-none space-y-4 min-h-[1em]"
        dangerouslySetInnerHTML={{ __html: currentContent }}
      />
    );
  }

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor, state }) => {
          const { selection } = state;
          const { empty } = selection;

          if (empty && !editor.isActive("link")) {
            if (linkState.isAddingLink) {
              linkState.setIsAddingLink(false);
              linkState.setAddLinkUrl("");
              linkState.setSavedSelection(null);
            }
            if (linkState.isEditingLink) {
              linkState.setIsEditingLink(false);
            }
            return false;
          }

          if (linkState.isAddingLink) {
            return true;
          }

          if (!openLinkOnClick && editor.isActive("link")) {
            if (!linkState.isEditingLink) {
              const currentUrl = editor.getAttributes("link").href || "";
              linkState.setEditLinkUrl(currentUrl);
            }
            return true;
          }

          return !empty;
        }}
      >
        <div className="flex items-center p-1 rounded-lg border bg-background shadow-sm">
          <BubbleMenuContent
            editor={editor}
            openLinkOnClick={openLinkOnClick}
            linkState={linkState}
            handlers={linkHandlers}
            getActiveFormats={getActiveFormats}
            handleFormatChange={handleFormatChange}
          />
        </div>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </>
  );
};
