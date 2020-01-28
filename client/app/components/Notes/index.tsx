import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';

import Empty from '../Empty';
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { request, response, loading } = useFetch('/api');

  const getNotes = async () => {
    const result = await request.get('/notes');

    if (response.ok) {
      setNotes(result.data);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes">
      {loading && 'Loading...'}
      {notes && notes.length > 0 ? (
        notes.map(note => <div key={note._id}>{note.title}</div>)
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Notes;
