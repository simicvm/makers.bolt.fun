import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TOURNAMENT_TRACK, UPDATE_TOURNAMENT_TRACK, DELETE_TOURNAMENT_TRACK, GET_TOURNAMENT_TRACKS } from './graphql';
import 'tailwindcss/tailwind.css';

const TournamentTrack = () => {
  const [tracks, setTracks] = useState([]);
  const { loading, error, data } = useQuery(GET_TOURNAMENT_TRACKS);
  const [createTrack] = useMutation(CREATE_TOURNAMENT_TRACK);
  const [updateTrack] = useMutation(UPDATE_TOURNAMENT_TRACK);
  const [deleteTrack] = useMutation(DELETE_TOURNAMENT_TRACK);

  useEffect(() => {
    if (data) {
      setTracks(data.tournamentTracks);
    }
  }, [data]);

  const handleCreate = async (track) => {
    const { data } = await createTrack({ variables: { track } });
    setTracks([...tracks, data.createTournamentTrack]);
  };

  const handleUpdate = async (id, updatedTrack) => {
    const { data } = await updateTrack({ variables: { id, updatedTrack } });
    setTracks(tracks.map(track => track.id === id ? data.updateTournamentTrack : track));
  };

  const handleDelete = async (id) => {
    await deleteTrack({ variables: { id } });
    setTracks(tracks.filter(track => track.id !== id));
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Tournament Tracks</h1>
      {/* Add your UI for creating, updating, and deleting Tournament Tracks here */}
    </div>
  );
};

export default TournamentTrack;