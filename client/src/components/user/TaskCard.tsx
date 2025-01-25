import { FC, useState } from "react";
import { ITask } from "../../interface/ITask";
import { useDrag } from "react-dnd";
import { toast } from "sonner";
import Axios from "../../api/axios/axios";
import { TASK_ENDPOINTS } from "../../api/endpoints/taskEndpoints";
import { Trash2 } from "lucide-react";
import DeleteTaskModal from "./DeleteModal";

interface TaskCardProps {
  task: ITask;
  columnId: string;
  onDelete: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, columnId, onDelete }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-red-600";
      case "progress":
        return "bg-yellow-600";
      case "done":
        return "bg-green-600";
      default:
        return "bg-slate-700";
    }
  };

  const statusColor = getStatusColor(task.status);

  const handleDelete = async (taskId: string) => {
    try {
      const response = await Axios.delete(`${TASK_ENDPOINTS.DELETETASK}/${taskId}`);

      if (response.status === 200) {
        onDelete(taskId);
        setIsDelete(false);
      }
    } catch (error) {
      console.log("Error occurred while deleting task", error);
      toast.error("Error can't delete task, Try later");
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-slate-800 p-4 rounded-lg shadow-md mb-3 group hover:ring-2 hover:ring-blue-500 transition-all cursor-grab ${
        isDragging ? "opacity-0" : ""
      }`}
      style={{
        zIndex: isDragging ? 100 : "auto",
        pointerEvents: isDragging ? "none" : "auto",
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-slate-200 font-medium break-words">{task.title}</h4>
        <button
          onClick={() => setIsDelete(true)}
          className="text-slate-400 hover:text-red-500 transition-all duration-300 transform hover:scale-125 opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-400 break-words">{task.description}</p>
        <span className={`text-xs text-white font-semibold ${statusColor} px-2 py-1 rounded-full w-fit`}>
          {task.status}
        </span>
      </div>
      {isDelete && (
        <DeleteTaskModal
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirmDelete={() => handleDelete(task._id)}
          taskTitle={task.title}
        />
      )}
    </div>
  );
};

export default TaskCard;