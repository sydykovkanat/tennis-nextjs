'use client';

import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ReactQuill = dynamic(() => import('react-quill').then((mod) => mod.default), { ssr: false });

export const NewsEditor: React.FC<Props> = ({ value, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
  ];

  useEffect(() => {
    // bug in quill editor with word-wrap problem(it is solution)
    if (editorLoaded) {
      const qlEditor = document.querySelector('.ql-editor') as HTMLElement | null;
      const qlContainer = document.querySelector('.ql-container') as HTMLElement | null;

      if (qlEditor) {
        qlEditor.style.wordWrap = 'anywhere';
        qlEditor.style.minHeight = 'inherit';
      }

      if (qlContainer) {
        qlContainer.style.minHeight = '200px';
      }
    }
  }, [editorLoaded]);

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbarOptions,
      }}
      placeholder='Содержание новости...'
      onFocus={() => setEditorLoaded(true)}
    />
  );
};
