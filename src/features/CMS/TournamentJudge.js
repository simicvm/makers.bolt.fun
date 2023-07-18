import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_JUDGE, UPDATE_JUDGE, DELETE_JUDGE, GET_JUDGES } from './queries';
import 'tailwindcss/tailwind.css';

const TournamentJudge = () => {
  const [judges, setJudges] = useState([]);
  const { loading, error, data } = useQuery(GET_JUDGES);
  const [createJudge] = useMutation(CREATE_JUDGE);
  const [updateJudge] = useMutation(UPDATE_JUDGE);
  const [deleteJudge] = useMutation(DELETE_JUDGE);

  useEffect(() => {
    if (data) {
      setJudges(data.judges);
    }
  }, [data]);

  const handleCreate = async (judge) => {
    const { data } = await createJudge({ variables: { judge } });
    setJudges([...judges, data.createJudge]);
  };

  const handleUpdate = async (id, updatedJudge) => {
    await updateJudge({ variables: { id, updatedJudge } });
    setJudges(judges.map(judge => (judge.id === id ? updatedJudge : judge)));
  };

  const handleDelete = async (id) => {
    await deleteJudge({ variables: { id } });
    setJudges(judges.filter(judge => judge.id !== id));
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Tournament Judges</h1>
      {/* Add your UI for creating, updating, and deleting judges here */}
    </div>
  );
};

export default TournamentJudge;