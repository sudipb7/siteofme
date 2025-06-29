"use client";

import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";

import { cn } from "@/lib/utils";

interface PublicSiteEditorProps {
  content: string;
}

export const PublicSiteEditor = ({ content }: PublicSiteEditorProps) => {
  const editor = useEditor({
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "outline-none space-y-4",
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
        linkOnPaste: false,
        openOnClick: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        HTMLAttributes: {
          class: cn("underline underline-offset-2 cursor-pointer"),
          target: "_blank",
          rel: "noopener noreferrer",
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
  });

  if (!editor) {
    return <div className="outline-none space-y-4" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <EditorContent editor={editor} />;
};
