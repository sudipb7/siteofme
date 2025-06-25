import { useCallback } from "react";
import StarterKit from "@tiptap/starter-kit";
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "lucide-react";
import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";

import { useEditorStore } from "../../lib/store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const TipTapEditor = () => {
  const { content, setContent } = useEditorStore();

  const editor = useEditor({
    content,
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class: "outline-none space-y-4 p-4",
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
        history: false,
        dropcursor: false,
        gapcursor: false,
        hardBreak: false,
      }),
    ],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

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

  if (!editor) {
    return <EditorContent editor={editor} />;
  }

  return (
    <>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
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
      </BubbleMenu>
      <EditorContent editor={editor} />
    </>
  );
};
