import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { request, response, loading } = useFetch('/api');

  const getNotes = async () => {
    const result = await request.get('/notes/ss');

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
        <div>no data</div>
      )}
    </div>
  );
};

export default Notes;
