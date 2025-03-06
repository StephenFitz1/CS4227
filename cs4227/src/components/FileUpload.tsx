import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onFileUpload }: { onFileUpload: (files: string[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(file => file.type === "text/csv" && file.size <= 2 * 1024 * 1024);
      setFiles([...files, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAcceptFiles = async () => {
    if (files.length > 10) {
      setMessage("Error: You can upload up to 10 files only.");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const response = await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      onFileUpload(response.data as string[]);
      setFiles([]);
      setMessage("All files have been uploaded successfully.");
    } catch (error) {
      setMessage("Error uploading files. Please try again.");
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} multiple />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} <button onClick={() => handleRemoveFile(index)}>Remove</button>
          </li>
        ))}
      </ul>
      {files.length > 0 && <button onClick={handleAcceptFiles}>Accept</button>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;