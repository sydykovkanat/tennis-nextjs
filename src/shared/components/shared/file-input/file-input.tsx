import { Button, Input, Label } from '@/shared/components/ui';

import React, { useRef, useState } from 'react';

import styles from './file-input.module.css';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  multiple?: boolean;
  id?: string;
  accept?: string;
}

export const FileInput: React.FC<Props> = ({ onChange, name, label, multiple = false, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string | string[]>('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (multiple) {
        const filesArray = Array.from(e.target.files).map((file) => file.name);
        setFilename(filesArray);
      } else {
        setFilename(e.target.files[0].name);
      }
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <Label htmlFor={name}>{label}</Label>
      <input
        style={{ display: 'none' }}
        type='file'
        name={name}
        onChange={onFileChange}
        ref={inputRef}
        multiple={multiple}
        accept={accept}
      />
      <div className={styles.inputWrapper}>
        <Input
          disabled
          value={Array.isArray(filename) ? filename.join(', ') : filename}
          placeholder='Выберите файл'
          onClick={activateInput}
          className='cursor-pointer'
        />
        <Button onClick={activateInput} type='button'>
          Выбрать
        </Button>
      </div>
    </div>
  );
};
