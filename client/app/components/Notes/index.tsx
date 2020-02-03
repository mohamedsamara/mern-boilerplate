import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Icon, Typography, Modal, message } from 'antd';

import Button from '../Button';
import Empty from '../Empty';
import Loading from '../Loading';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import AddNoteForm from './AddNoteForm';

const { Text } = Typography;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [open, openModal] = useState(false);
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

    const result = await request.post('/notes', newNote);
    if (response.ok) {
      fetchNotes();
      message.success(result.message);
    }
  };

  const updateNote = async note => {
    const newNote = {
      title: note.title,
      content: note.content,
    };

    const result = await request.put(`/notes/${note._id}`, newNote);

    message.success(result.message);
  };

  const deleteNote = async note => {
    const result = await request.delete(`/notes/${note._id}`);

    const newNotes = [...notes];
    setNotes(newNotes.filter(x => x._id !== note._id));

    message.info(result.message);
  };

  const handleFieldChange = (id, value) => {
    const index = notes.findIndex(x => x._id === id);

    const newNotes = [...notes];
    newNotes[index].title = value;
    setNotes(newNotes);
  };

  const handleEditorChange = (id, value) => {
    const index = notes.findIndex(x => x._id === id);

    const newNotes = [...notes];
    newNotes[index].content = value;
    setNotes(newNotes);
  };

  const getNotes = () => {
    return notes.map(note => (
      <Col sm={24} md={24} lg={12} xl={8} key={note._id} className="gutter-row">
        <div className="note">
          <Button
            onClick={() => deleteNote(note)}
            type="danger"
            shape="circle"
            icon="close"
            className="delete-note"
          />
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
            <Button text="Save" block onClick={() => updateNote(note)} />
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
              <AddNoteForm addNote={addNote} cancel={() => setEmpty(false)} />
            </Col>
          ) : (
            <Col sm={24} md={24} lg={12} xl={8} className="gutter-row">
              <div className="add-note-hidden">
                <Button
                  shape="circle"
                  icon="plus"
                  onClick={() => setEmpty(true)}
                />
                <Text strong className="add-note-text">
                  Add New Note
                </Text>
              </div>
            </Col>
          )}
          {getNotes()}
        </Row>
      ) : (
        <>
          <div className="add-note-link">
            <Button type="link" size="large" onClick={() => openModal(true)}>
              <Icon type="plus" /> New account
            </Button>
          </div>
          <Modal
            visible={open}
            footer={null}
            className="notes-modal"
            onCancel={() => openModal(false)}
          >
            <AddNoteForm addNote={addNote} />
          </Modal>
          <Empty />
        </>
      )}
    </div>
  );
};

export default Notes;
