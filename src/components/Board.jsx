import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'Pending').length;

  const createTask = () => {
    setTimeout(() => {
      const newTask = {
        id: Date.now(),
        title: `Task #${tasks.length + 1}`,
        status: 'Pending',
      };

      dispatch({
        type: 'ADD_TASK',
        payload: newTask,
      });
    }, 500);
  };

  const cloneTask = () => {
    if (tasks.length === 0) return;

    const lastTask = tasks[tasks.length - 1];

    dispatch({
      type: 'CLONE_TASK',
      payload: lastTask.id,
    });
  };

  const deleteTask = (id) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const updateStatus = (id, newStatus) => {
    dispatch({
      type: 'UPDATE_STATUS',
      payload: { id, status: newStatus },
    });
  };
  const renameTask = (id, newTitle) => {
  dispatch({
    type: 'UPDATE_TASK_NAME',
    payload: { id, title: newTitle },
  });
};


  return (
    <div className="container">
      <h2>
        Tasks ({tasks.length}) | Completed: {completedTasks} | Pending: {pendingTasks}
      </h2>

      <button onClick={cloneTask}>Clone Task</button>
      <button onClick={createTask}>Create Task</button>

      <ul>
  {tasks.map((task) => (
    <li key={task.id}>
      <Task
        id={task.id}
        title={task.title}
        status={task.status}
        onDelete={deleteTask}
        onStatusChange={updateStatus}
        onRename={renameTask}
      />
    </li>
  ))}
</ul>
    </div>
  );
};

export default Board;