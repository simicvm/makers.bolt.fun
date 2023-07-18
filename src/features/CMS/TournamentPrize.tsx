import React, { useState, useEffect } from 'react';
import { SingleImageUploadInput } from './SingleImageUploadInput';
import axios from 'axios';

interface TournamentPrize {
  id: string;
  name: string;
  description: string;
  image: string;
}

const TournamentPrize: React.FC = () => {
  const [prizes, setPrizes] = useState<TournamentPrize[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    const response = await axios.get('/api/tournamentPrizes');
    setPrizes(response.data);
    setLoading(false);
  };

  const createPrize = async (prize: TournamentPrize) => {
    await axios.post('/api/tournamentPrizes', prize);
    fetchPrizes();
  };

  const updatePrize = async (prize: TournamentPrize) => {
    await axios.put(`/api/tournamentPrizes/${prize.id}`, prize);
    fetchPrizes();
  };

  const deletePrize = async (id: string) => {
    await axios.delete(`/api/tournamentPrizes/${id}`);
    fetchPrizes();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {prizes.map((prize) => (
        <div key={prize.id} className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow">
          <div>
            <h2 className="text-lg font-semibold">{prize.name}</h2>
            <p>{prize.description}</p>
          </div>
          <div>
            <SingleImageUploadInput image={prize.image} />
          </div>
          <div>
            <button onClick={() => deletePrize(prize.id)} className="px-4 py-2 text-white bg-red-500 rounded">Delete</button>
            <button onClick={() => updatePrize(prize)} className="px-4 py-2 text-white bg-blue-500 rounded">Update</button>
          </div>
        </div>
      ))}
      <button onClick={() => createPrize({ id: '', name: '', description: '', image: '' })} className="px-4 py-2 text-white bg-green-500 rounded">Add New Prize</button>
    </div>
  );
};

export default TournamentPrize;