import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Icon } from 'antd';

import Empty from '../Empty';
import Loading from '../Loading';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';

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

  const handleAddEmptyNote = () => {
    const emptyNote = {
      title: '',
      content: '',
      empty: true,
    };

    const newNotes = [...notes, emptyNote];
    setNotes(newNotes);
  };

  const addNote = async note => {
    console.log(note);

    const result = await request.post('/notes', note);
    if (response.ok) {
      console.log(result);
    }
  };

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

  const handleFieldChange = value => {
    console.log(value);
  };

  const handleEditorChange = (value, data) => {
    console.log(value, data);
  };

  const getNotes = () => {
    return notes.map((note, idx) => (
      <Col xs={24} sm={8} md={8} key={idx} className="gutter-row note">
        <RichTextField data={note.title} handleChange={handleFieldChange} />
        <RichTextEditor data={note} handleChange={handleEditorChange} />
        <div className="note-actions">
          <Icon type="plus" onClick={handleAddEmptyNote} />
          {note.empty ? (
            <button onClick={() => addNote(note)}>Save</button>
          ) : (
            <button onClick={() => updateNote(note)}>Save</button>
          )}
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
