import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_HOSTED_IMAGE, DELETE_HOSTED_IMAGE, UPDATE_HOSTED_IMAGE, GET_HOSTED_IMAGES } from './queries';
import SingleImageUploadInput from './SingleImageUploadInput';

const HostedImage = () => {
  const { loading, error, data } = useQuery(GET_HOSTED_IMAGES);
  const [createHostedImage] = useMutation(CREATE_HOSTED_IMAGE);
  const [updateHostedImage] = useMutation(UPDATE_HOSTED_IMAGE);
  const [deleteHostedImage] = useMutation(DELETE_HOSTED_IMAGE);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const handleCreate = () => {
    createHostedImage({ variables: { image: selectedImage } });
  };

  const handleUpdate = (id) => {
    updateHostedImage({ variables: { id, image: selectedImage } });
  };

  const handleDelete = (id) => {
    deleteHostedImage({ variables: { id } });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Hosted Images</h1>
      <SingleImageUploadInput onImageUpload={handleImageUpload} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreate}>Create</button>
      {data.hostedImages.map((image) => (
        <div key={image.id} className="my-2">
          <img src={image.url} alt="Hosted" className="w-64 h-64 object-cover" />
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdate(image.id)}>Update</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(image.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default HostedImage;