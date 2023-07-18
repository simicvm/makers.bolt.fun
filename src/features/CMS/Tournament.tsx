import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SingleImageUploadInput } from './SingleImageUploadInput';

interface Tournament {
  id: string;
  name: string;
  hostedImage: string;
}

export const Tournament: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/tournaments')
      .then(response => {
        setTournaments(response.data);
        setLoading(false);
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  const deleteTournament = (id: string) => {
    axios.delete(`/api/tournaments/${id}`)
      .then(() => {
        setTournaments(tournaments.filter(tournament => tournament.id !== id));
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4">Tournaments</h1>
      {tournaments.map(tournament => (
        <div key={tournament.id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{tournament.name}</h3>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <SingleImageUploadInput image={tournament.hostedImage} />
          </div>
          <div className="px-4 py-4 sm:px-6">
            <button onClick={() => deleteTournament(tournament.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};