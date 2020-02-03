import React, { useEffect, useState } from 'react';

import useFetch from 'use-http';
import { Row, Col, Icon, Typography, Modal, message } from 'antd';

import Button from '../Button';
import Empty from '../Empty';
import Loading from '../Loading';
import AddNoteForm from './AddNoteForm';
import NoteItem from './NoteItem';

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

  const addNoteApi = async note => {
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

  const updateNoteApi = async note => {
    const newNote = {
      title: note.title,
      content: note.content,
    };

    const result = await request.put(`/notes/${note._id}`, newNote);

    message.success(result.message);
  };

  const deleteNoteApi = async id => {
    const result = await request.delete(`/notes/${id}`);

    const newNotes = [...notes];
    setNotes(newNotes.filter(x => x._id !== id));

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

  const handleSetEmpty = () => {
    setEmpty(true);
  };

  const handleUnsetEmpty = () => {
    setEmpty(false);
  };

  const handleOpenModal = () => {
    openModal(true);
  };

  const handleCloseModal = () => {
    openModal(false);
  };

  const addNote = note => {
    addNoteApi(note);
  };

  const updateNote = note => {
    updateNoteApi(note);
  };

  const deleteNote = id => {
    deleteNoteApi(id);
  };

  const getNotes = () => {
    return notes.map(note => (
      <NoteItem
        key={note._id}
        note={note}
        handleFieldChange={handleFieldChange}
        handleEditorChange={handleEditorChange}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    ));
  };

  return (
    <div className="notes">
      <div className="loading-box">{loading && <Loading />}</div>
      {notes && notes.length > 0 ? (
        <Row gutter={[16, 16]}>
          <Col sm={24} md={24} lg={12} xl={8} className="gutter-row">
            {empty ? (
              <AddNoteForm addNote={addNoteApi} cancel={handleUnsetEmpty} />
            ) : (
              <div className="add-note-hidden">
                <Button shape="circle" icon="plus" onClick={handleSetEmpty} />
                <Text strong className="add-note-text">
                  Add New Note
                </Text>
              </div>
            )}
          </Col>

          {getNotes()}
        </Row>
      ) : (
        <>
          <div className="add-note-link">
            <Button type="link" size="large" onClick={handleOpenModal}>
              <Icon type="plus" /> New account
            </Button>
          </div>
          <Modal
            visible={open}
            footer={null}
            className="notes-modal"
            onCancel={handleCloseModal}
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
