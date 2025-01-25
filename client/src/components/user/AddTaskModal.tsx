import React, { FC, useState } from "react";
import { ArrowRight, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import Axios from "../../api/axios/axios";
import { TASK_ENDPOINTS } from "../../api/endpoints/taskEndpoints";
import { ITask } from "../../interface/ITask";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface AddTaskModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSuccess:(newTask:ITask)=>void;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({title: "",description: ""});
  const [errors, setErrors] = useState<{title?:string; description?:string;}>({});
  const [loading, setLoading] = useState<boolean>(false);

  const userId = useSelector((store:RootState)=>store.userAuth.id)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    })); 
  };

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {title?:string; description?:string} = {};
    if (!formData.title.trim()) newErrors.title = "Title field is required.";
    if (!formData.description.trim())
      newErrors.description = "Description field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
    try {
        setLoading(true)
        const response = await Axios.post(`${TASK_ENDPOINTS.ADDNEWTASK}/${userId}`,formData)
        if(response.status==201){
            toast.success("Task added successfully")
            onSuccess(response.data.data);
            setFormData({ title: "", description: "" });
            onClose()
        }
    } catch (error) {
        console.log("Error occured while adding new Task",error);
        toast.error("Error occured while adding new task")
    }finally{
        setLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg w-full max-w-md relative transform transition-all">

        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-200">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-slate-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-800 border ${
                errors.title ? "border-red-500" : "border-slate-700"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition-all duration-200`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>


          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 bg-slate-800 border ${
                errors.description ? "border-red-500" : "border-slate-700"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-400 resize-none transition-all duration-200`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>


          <div className="relative flex justify-center items-center">
            <button
              type="submit"
              className="w-full border-2 border-blue-500 hover:border hover:bg-blue-700 text-white py-2 rounded font-semibold transition flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Add
                  <ArrowRight className="ml-2 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
