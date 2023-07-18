import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const TournamentPrize = () => {
  const { register, handleSubmit, errors } = useForm();
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    const response = await axios.get('/api/prizes');
    setPrizes(response.data);
  };

  const onSubmit = async (data) => {
    await axios.post('/api/prizes', data);
    fetchPrizes();
  };

  const deletePrize = async (id) => {
    await axios.delete(`/api/prizes/${id}`);
    fetchPrizes();
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Tournament Prizes</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prize Name</label>
          <input name="name" ref={register({ required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.name && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Prize</button>
      </form>
      <div>
        {prizes.map(prize => (
          <div key={prize.id} className="mb-4 p-4 bg-gray-200 rounded">
            <h2 className="text-2xl font-bold mb-2">{prize.name}</h2>
            <button onClick={() => deletePrize(prize.id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPrize;