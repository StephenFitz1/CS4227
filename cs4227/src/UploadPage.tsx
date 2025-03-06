import React, { useState } from "react";
import FileUpload from "./components/FileUpload";

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (uploadedFileNames: string[]) => {
    setUploadedFiles([...uploadedFiles, ...uploadedFileNames]);
  };

  const handleFileRemove = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileName));
  };

  return (
    <div>
      <h1>Upload Your CSV Files</h1>
      <p>Only CSV files under 2MB in size are allowed. You are able to upload up to 10 files.</p>
      <FileUpload onFileUpload={handleFileUpload} />
      {uploadedFiles.length > 0 && (
        <div>
          <h5>Uploaded Files:</h5>
          <ul>
            {uploadedFiles.map(file => (
              <li key={file}>
                {file} <button onClick={() => handleFileRemove(file)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
