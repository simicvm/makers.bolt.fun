import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const TournamentEvent = () => {
  const { register, handleSubmit, errors } = useForm();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/tournamentEvent')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onSubmit = data => {
    axios.post('/api/tournamentEvent', data)
      .then(response => {
        setEvents([...events, response.data]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteEvent = id => {
    axios.delete(`/api/tournamentEvent/${id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Tournament Events</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Event Name
          </label>
          <input
            name="name"
            ref={register({ required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Event Name"
          />
          {errors.name && <span className="text-red-500 text-xs italic">Event name is required.</span>}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Add Event
        </button>
      </form>
      <div>
        {events.map(event => (
          <div key={event.id} className="mb-4 p-4 bg-gray-200 rounded">
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentEvent;