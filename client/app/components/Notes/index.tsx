import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Icon } from 'antd';

import Empty from '../Empty';
import Loading from '../Loading';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import AddNoteForm from './AddNoteForm';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [empty, setEmpty] = useState(false);
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

  const addNote = async note => {
    console.log('note is', note);

    const newNote = {
      title: note.title,
      content: note.content,
    };
    const result = await request.post('/notes', newNote);
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

  const handleFieldChange = (id, value) => {
    const noteIndex = notes.findIndex(note => note._id === id);

    const newNotes = [...notes];
    newNotes[noteIndex].title = value;
    setNotes(newNotes);
  };

  const handleEditorChange = (id, value) => {
    const noteIndex = notes.findIndex(note => note._id === id);

    const newNotes = [...notes];
    newNotes[noteIndex].content = value;
    setNotes(newNotes);
  };

  const handleSetEmpty = () => {
    setEmpty(true);
  };

  const getNotes = () => {
    return notes.map((note, idx) => (
      <Col xs={24} sm={12} md={6} key={idx} className="note">
        <RichTextField
          value={note.title}
          handleChange={value => handleFieldChange(note._id, value)}
        />
        <RichTextEditor
          value={note}
          handleChange={value => handleEditorChange(note._id, value)}
        />
        <div className="note-actions">
          <Icon type="plus" onClick={handleSetEmpty} />
          <button onClick={() => updateNote(note)}>Save</button>
        </div>
      </Col>
    ));
  };

  return (
    <div className="notes">
      {loading && <Loading />}
      {notes && notes.length > 0 ? (
        <Row gutter={16}>
          {empty && (
            <Col xs={24} sm={12} md={6} className="note">
              <AddNoteForm addNote={addNote} />
            </Col>
          )}
          {getNotes()}
        </Row>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Notes;
