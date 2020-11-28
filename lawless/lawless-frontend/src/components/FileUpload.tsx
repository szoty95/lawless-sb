import React from 'react';
import { Button } from '@material-ui/core';

type FileUploadProps = {
  disabled: boolean;
  handleUpload: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ disabled, handleUpload }) => {
  return (
    <div>
      <label htmlFor="file-upload">
        <input
          disabled={disabled}
          type="file"
          id="file-upload"
          name="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              handleUpload(file);
            }
          }}
          style={{ display: 'none' }}
        />
        <Button disabled={disabled} variant="contained" component="span">
          Choose File
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;
