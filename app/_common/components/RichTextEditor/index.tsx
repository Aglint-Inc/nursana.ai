'use client';
import './editorStyle.css';

import Placeholder from '@tiptap/extension-placeholder';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  maxHeight = '200px',
  minHeight = '100px',
  isTool = true,
}: {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  maxHeight?: string;
  minHeight?: string;
  isTool?: boolean;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: `min-h-[${minHeight}] bg-white max-h-[${maxHeight}] ${isTool ? 'rounded-tr-none rounded-tl-none border-t-0' : ''} w-full rounded-md  border border-input bg-transparent px-3   text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto`,
      },
    },
    // ${isTool ? 'rounded-br-none rounded-bl-none' : ''}
    extensions: [
      Placeholder.configure({
        placeholder: placeholder || '',
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className=''>
      {isTool && editor ? <RichTextEditorToolbar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className='flex flex-row items-center gap-1 rounded-tl-md rounded-tr-md border border-input bg-white p-1'>
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4' />
      </Toggle>
      <Separator orientation='vertical' className='h-8 w-[1px]' />
      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='h-4 w-4' />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
