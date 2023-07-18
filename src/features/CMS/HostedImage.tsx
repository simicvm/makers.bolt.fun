import React, { useState } from 'react';
import SingleImageUploadInput from './SingleImageUploadInput';

interface HostedImage {
  id: string;
  url: string;
}

const HostedImage: React.FC = () => {
  const [hostedImages, setHostedImages] = useState<HostedImage[]>([]);

  const createHostedImage = (url: string) => {
    const newHostedImage: HostedImage = {
      id: Date.now().toString(),
      url,
    };
    setHostedImages([...hostedImages, newHostedImage]);
  };

  const updateHostedImage = (id: string, url: string) => {
    setHostedImages(
      hostedImages.map((image) =>
        image.id === id ? { ...image, url } : image
      )
    );
  };

  const deleteHostedImage = (id: string) => {
    setHostedImages(hostedImages.filter((image) => image.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Hosted Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {hostedImages.map((image) => (
          <div key={image.id} className="border p-2">
            <img src={image.url} alt="Hosted" className="mb-2" />
            <SingleImageUploadInput
              onUpload={(url) => updateHostedImage(image.id, url)}
            />
            <button
              className="mt-2 w-full bg-red-500 text-white p-2 rounded"
              onClick={() => deleteHostedImage(image.id)}
            >
              Delete
            </button>
          </div>
        ))}
        <div className="border p-2">
          <SingleImageUploadInput onUpload={createHostedImage} />
        </div>
      </div>
    </div>
  );
};

export default HostedImage;