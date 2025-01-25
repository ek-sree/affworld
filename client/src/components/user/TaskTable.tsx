import Column from "./Column";
import { column } from "../../constant/column";
import { useEffect, useState } from "react";
import { TASK_ENDPOINTS } from "../../api/endpoints/taskEndpoints";
import Axios from "../../api/axios/axios";
import { ITask } from "../../interface/ITask";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import { toast } from "sonner";

const TaskTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tasks, setTask] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = useSelector((store: RootState) => store.userAuth.id);

  useEffect(() => {
    let isMounted = true;

    const fetchTasks = async () => {
      try {
        const response = await Axios.get(`${TASK_ENDPOINTS.FETCHTASKS}/${userId}`);
        if (isMounted && response.status === 200) {
          setTask(response.data.data || []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.log("Error fetching tasks", error);
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleOpenTask = () => {
    setOpenModal(true);
  };

  const handleSuccessAdd = (newTask: ITask) => {
    setTask((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTask((prev) => prev.filter((task) => task._id !== taskId));
  };


  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
  
    if (!taskToUpdate) {
      toast.error("Task not found");
      throw new Error("Task not found");
    }
  
    const updatedTask = { ...taskToUpdate, status: newStatus };
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? updatedTask : task
    );
  
    setTask(updatedTasks);
  
    try {
      const response = await Axios.put(`${TASK_ENDPOINTS.EDITTASK}/${taskId}`, {
        status: newStatus,
      });
  
      if (response.status !== 200) {
        toast.error("Error occurred while updating");
        setTask(tasks);
        throw new Error("Update failed");
      }
  
      return response;
    } catch (error) {
      console.log("Error editing task", error);
      toast.error("Failed to update task status");
      setTask(tasks);
      throw error;
    }
  };
    

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-200">Task Board</h2>
          <p className="text-slate-400">Manage and track your tasks</p>
        </div>
        
          <button 
            onClick={handleOpenTask} 
            className="p-1 hover:bg-slate-700 text-slate-300 rounded-full transition-colors flex justify-center items-center border-2 border-slate-400 px-2 py-2 mb-3"
          >
            ADD TASKS
            <Plus className="w-5 h-5 text-slate-400 hover:text-blue-500" />
          </button>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {column.map((col) => (
            <Column
              key={col.id}
              columnData={col}
              tasks={tasks.filter((task) => task.status === col.id)}
              onDelete={handleDeleteTask} 
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>

        {loading && (
          <div className="text-center text-slate-300 mt-4">
            Loading tasks...
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center text-slate-300 mt-4">
            No tasks added yet! Add one by clicking 
            <span className="text-2xl text-neutral-200 pl-2"><b> "+" </b></span>
          </div>
        )}
      </div>

      {openModal && (
        <AddTaskModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={(newTask) => handleSuccessAdd(newTask)}
        />
      )}
    </div>
  );
};


export default TaskTable;
