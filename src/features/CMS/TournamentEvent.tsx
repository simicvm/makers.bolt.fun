import React, { useState, useEffect } from 'react';
import { SingleImageUploadInput } from './SingleImageUploadInput';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

interface TournamentEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  hostedImage: string;
}

const TournamentEvent: React.FC = () => {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/tournamentEvent').then(response => {
      setEvents(response.data);
      setLoading(false);
    });
  }, []);

  const createEvent = (event: TournamentEvent) => {
    axios.post('/api/tournamentEvent', event).then(response => {
      setEvents([...events, response.data]);
    });
  };

  const updateEvent = (event: TournamentEvent) => {
    axios.put(`/api/tournamentEvent/${event.id}`, event).then(response => {
      setEvents(events.map(item => item.id === event.id ? response.data : item));
    });
  };

  const deleteEvent = (id: string) => {
    axios.delete(`/api/tournamentEvent/${id}`).then(() => {
      setEvents(events.filter(item => item.id !== id));
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {events.map(event => (
        <div key={event.id} className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-2xl mb-4">{event.name}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <SingleImageUploadInput image={event.hostedImage} />
              <button onClick={() => updateEvent(event)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
              <button onClick={() => deleteEvent(event.id)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={createEvent} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create New Event
      </button>
    </div>
  );
};

export default TournamentEvent;