import { useState } from 'react';

const Task = ({ id, title, status, onDelete, onStatusChange, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    onRename(id, newTitle);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {title} - <b>{status}</b>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>
            Edit
          </button>
        </>
      )}

      <button
        onClick={() =>
          onStatusChange(id, status === 'Pending' ? 'Completed' : 'Pending')
        }
        style={{ marginLeft: '10px' }}
      >
        Toggle Status
      </button>

      <button
        onClick={() => onDelete(id)}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </button>
    </>
  );
};

export default Task;