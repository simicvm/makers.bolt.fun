import React, { useState, useEffect } from 'react';
import { SingleImageUploadInput } from './SingleImageUploadInput';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

interface ITournamentTrack {
  id: number;
  name: string;
  hostedImage: string;
}

const TournamentTrack: React.FC = () => {
  const [tracks, setTracks] = useState<ITournamentTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('/api/tournamentTrack');
      setTracks(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createTrack = async (track: ITournamentTrack) => {
    try {
      await axios.post('/api/tournamentTrack', track);
      fetchTracks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTrack = async (track: ITournamentTrack) => {
    try {
      await axios.put(`/api/tournamentTrack/${track.id}`, track);
      fetchTracks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrack = async (id: number) => {
    try {
      await axios.delete(`/api/tournamentTrack/${id}`);
      fetchTracks();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      {tracks.map((track) => (
        <div key={track.id} className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="border rounded p-4">
              <h2 className="text-2xl mb-4">{track.name}</h2>
              <SingleImageUploadInput image={track.hostedImage} />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => updateTrack(track)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => deleteTrack(track.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentTrack;