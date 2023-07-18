import React, { useState, useEffect } from 'react';
import { SingleImageUploadInput } from './SingleImageUploadInput';
import axios from 'axios';

interface ITournamentJudge {
  id: number;
  name: string;
  image: string;
}

export const TournamentJudge: React.FC = () => {
  const [judges, setJudges] = useState<ITournamentJudge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchJudges();
  }, []);

  const fetchJudges = async () => {
    try {
      const response = await axios.get('/api/tournamentJudge');
      setJudges(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createJudge = async (judge: ITournamentJudge) => {
    try {
      await axios.post('/api/tournamentJudge', judge);
      fetchJudges();
    } catch (error) {
      console.error(error);
    }
  };

  const updateJudge = async (judge: ITournamentJudge) => {
    try {
      await axios.put(`/api/tournamentJudge/${judge.id}`, judge);
      fetchJudges();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJudge = async (id: number) => {
    try {
      await axios.delete(`/api/tournamentJudge/${id}`);
      fetchJudges();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        judges.map((judge) => (
          <div key={judge.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full" src={judge.image} alt={judge.name} />
              <div className="ml-4">
                <h4 className="text-lg font-semibold">{judge.name}</h4>
              </div>
            </div>
            <div>
              <button className="text-red-500 hover:text-red-700" onClick={() => deleteJudge(judge.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
      <div className="mt-4">
        <SingleImageUploadInput />
      </div>
    </div>
  );
};