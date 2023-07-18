import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const SingleImageUploadInput = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()} className="w-full h-64 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-md bg-white text-center">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="text-gray-600">Drop the image here...</p> :
          <p className="text-gray-600">Drag 'n' drop some image here, or click to select image</p>
      }
    </div>
  )
}

export default SingleImageUploadInput;