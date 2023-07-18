import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Tournament = () => {
  const { register, handleSubmit, errors } = useForm();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get('/api/tournaments')
      .then(response => {
        setTournaments(response.data);
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`);
      })
  }, []);

  const onSubmit = data => {
    axios.post('/api/tournaments', data)
      .then(response => {
        setTournaments(prevTournaments => [...prevTournaments, response.data]);
      })
      .catch(error => {
        console.error(`Error creating tournament: ${error}`);
      })
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Tournaments</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tournament-name">
              Tournament Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="tournament-name" 
              name="name" 
              ref={register({ required: true })} 
            />
            {errors.name && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Create Tournament
        </button>
      </form>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id} className="bg-white rounded shadow-md p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2">{tournament.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournament;