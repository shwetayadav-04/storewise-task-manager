const loadTasks = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  tasks: loadTasks(),
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case 'UPDATE_TASK_NAME': {
  const updatedTasks = state.tasks.map((task) =>
    task.id === action.payload.id
      ? { ...task, title: action.payload.title }
      : task
  );

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  return {
    ...state,
    tasks: updatedTasks,
  };
}

    case 'DELETE_TASK': {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    case 'CLONE_TASK': {
      const taskToClone = state.tasks.find(
        (task) => task.id === action.payload
      );

      if (!taskToClone) return state;

      const clonedTask = {
        ...taskToClone,
        id: Date.now(),
        title: taskToClone.title + ' (Copy)',
      };

      const updatedTasks = [...state.tasks, clonedTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    case 'UPDATE_STATUS': {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    default:
      return state;
  }
}