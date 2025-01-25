import React, { useState, useRef, FC } from 'react';
import { X, ImagePlus, Trash2, Loader2 } from 'lucide-react';
import Axios from '../../api/axios/axios';
import { POST_ENDPOINTS } from '../../api/endpoints/postEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { IPost } from '../../interface/IPost';

interface IPostAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess:(newPost:IPost)=>void;
}

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/webp', 
  'image/gif'
];

const MAX_TITLE_LENGTH = 100;

const AddPostModal: FC<IPostAddProps> = ({ isOpen, onClose , onSuccess}) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const userId = useSelector((store:RootState)=>store.userAuth.id)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError('Invalid image type. Please upload JPEG, PNG, WebP, or GIF.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (title.trim().length === 0) {
      setError('Post title cannot be empty');
      return;
    }

    if (title.length > MAX_TITLE_LENGTH) {
      setError(`Title must be less than ${MAX_TITLE_LENGTH} characters`);
      return;
    }
    if (!image) {
        setError('Please upload an image before submitting');
        return;
      }
    
      const base64Response = await fetch(image);
      const blob = await base64Response.blob();
      const file = new File([blob], 'image.png', { type: 'image/png' });
  
      const formData = new FormData()
      formData.append('image', file)
      formData.append('title', title)
  

    setLoading(true);
    try {
      const response = await Axios.post(`${POST_ENDPOINTS.ADDNEWPOST}/${userId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      if(response.status==201){
        onSuccess(response.data.data)
      }
      onClose();
    } catch (err) {
        console.log("Error occured while adding post",err);
      setError('Failed to post. Please try again.',);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-slate-200">Create New Post</h2>
        </div>

        <div className="p-6 pt-4 relative">
          <textarea 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-slate-800 text-slate-300 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="text-right text-sm text-slate-400 mt-1">
            {title.length}/{MAX_TITLE_LENGTH}
          </div>
        </div>

        <div className="px-6 pb-6">
          {!image ? (
            <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">
              <input 
                type="file" 
                ref={fileInputRef}
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <ImagePlus className="w-10 h-10 text-slate-500 mb-2" />
                <p className="text-slate-400">Upload Image (JPEG, PNG, WebP, GIF)</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={image} 
                alt="Post preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 pt-0">
          <button 
            onClick={handleSubmit}
            disabled={!title.trim() || loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Post'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;