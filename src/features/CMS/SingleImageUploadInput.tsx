import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const SingleImageUploadInput: React.FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full h-64 border-2 border-gray-300 border-dashed rounded-md p-5">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="text-center text-gray-500">Drop the image here...</p> :
          <p className="text-center text-gray-500">Drag 'n' drop some image here, or click to select image</p>
      }
    </div>
  )
}

export default SingleImageUploadInput;