import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const TipTap = (): JSX.Element => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!!!! 🌎️</p>'
  });

  return <EditorContent editor={editor} />;
};

export default TipTap;
