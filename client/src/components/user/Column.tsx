import { FC } from "react";
import { ITask } from "../../interface/ITask";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { AxiosResponse } from "axios";

interface ColumnDataProps {
  columnData: {
    id: string;
    title: string;
  };
  tasks: ITask[]; 
  onDelete: (taskId: string) => void;
  updateTaskStatus: (taskId: string, newStatus: string) => Promise<AxiosResponse<ITask>>
}

const Column: FC<ColumnDataProps> = ({ columnData, tasks, onDelete, updateTaskStatus,  }) => {

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    canDrop: (item: { id: string; columnId: string }) => {
      return item.columnId !== columnData.id;  
    },
    drop: (item: { id: string; columnId: string }) => {
      updateTaskStatus(item.id, columnData.id);  
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] bg-slate-900 rounded-lg p-4 mx-2 first:ml-0 last:mr-0 ${
        isOver ? "bg-blue-800" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-slate-200">{columnData.title}</h3>
          <span className="ml-2 px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} columnId={columnData.id} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Column;