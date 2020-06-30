import React from 'react';

const NoteEntry = ({ entry }) => {
  return <div className="day__note">{entry.text}</div>;
};

export default NoteEntry;
