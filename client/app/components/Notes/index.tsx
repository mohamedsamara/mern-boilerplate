import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Button, Typography } from 'antd';

import Empty from '../Empty';
import Loading from '../Loading';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import AddNoteForm from './AddNoteForm';

const { Text } = Typography;

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
    setEmpty(false);

    const newNote = {
      title: note.title,
      content: note.content,
    };

    await request.post('/notes', newNote);
    if (response.ok) {
      fetchNotes();
    }
  };

  const updateNote = async note => {
    const newNote = {
      title: note.title,
      content: note.content,
    };

    await request.put(`/notes/${note._id}`, newNote);
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
      <Col sm={24} md={24} lg={12} xl={8} key={idx} className="gutter-row">
        <div className="note">
          <RichTextField
            label="title"
            value={note.title}
            handleChange={value => handleFieldChange(note._id, value)}
          />
          <RichTextEditor
            label="content"
            value={note}
            handleChange={value => handleEditorChange(note._id, value)}
          />
          <div className="note-actions">
            <Button block onClick={() => updateNote(note)}>
              Save
            </Button>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <div className="notes">
      <div className="loading-box">{loading && <Loading />}</div>
      {notes && notes.length > 0 ? (
        <Row gutter={[16, 16]}>
          {empty ? (
            <Col sm={24} md={24} lg={12} xl={8} className="gutter-row">
              <AddNoteForm addNote={addNote} />
            </Col>
          ) : (
            <Col sm={24} md={24} lg={12} xl={8} className="gutter-row">
              <div className="add-note-hidden">
                <Button shape="circle" icon="plus" onClick={handleSetEmpty} />
                <Text strong className="add-note-text">
                  Add New Note
                </Text>
              </div>
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
