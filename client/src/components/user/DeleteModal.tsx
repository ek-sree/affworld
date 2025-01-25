import { FC } from 'react';
import { Trash2, AlertCircle } from "lucide-react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  taskTitle: string;
}

const DeleteTaskModal: FC<DeleteTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirmDelete, 
  taskTitle 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white">
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl w-96">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-red-500 w-6 h-6 mr-2" />
          <h2 className="text-xl font-semibold">Confirm Deletion</h2>
        </div>
        <p className="mb-6">
          Are you sure you want to delete the task: 
          <span className="font-bold ml-1">{taskTitle}</span>
        </p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;