import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col } from 'antd';

import Empty from '../Empty';
import Loading from '../Loading';
import Editor from '../Editor';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { request, response, loading } = useFetch('/api');

  const fetchNotes = async () => {
    const result = await request.get('/notes');

    if (response.ok) {
      setNotes(result.data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // const addNote = async () => {
  //   const result = await request.post('/notes', {
  //     title: 'test',
  //   });
  //   if (response.ok) {
  //     console.log();
  //   }
  // };

  const updateNote = async note => {
    const newNote = {
      title: note.title,
      content: note.content,
    };

    const result = await request.put(`/notes/${note._id}`, newNote);
    if (response.ok) {
      console.log('update', result);
    }
  };

  const handleEditorChange = (value, data) => {
    console.log(value, data);
  };

  const getNotes = () => {
    return notes.map(note => (
      <Col xs={24} sm={8} md={8} key={note._id} className="gutter-row note">
        <Editor data={note} handleChange={handleEditorChange} />
        <div className="note-actions">
          <button onClick={() => updateNote(note)}>Save</button>
        </div>
      </Col>
    ));
  };

  return (
    <div className="notes">
      {loading && <Loading />}
      {notes && notes.length > 0 ? (
        <Row gutter={2}>{getNotes()}</Row>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Notes;
