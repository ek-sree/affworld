const BASE_URL = import.meta.env.VITE_API_URL;


export const TASK_ENDPOINTS = {
    ADDNEWTASK: `${BASE_URL}/task/addTask`,
    FETCHTASKS: `${BASE_URL}/task/fetchTasks`,
    EDITTASK:  `${BASE_URL}/task/editTask`,
    DELETETASK: `${BASE_URL}/task/deleteTask`,
  };
  