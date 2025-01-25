import { useEffect, useState } from 'react';
import {  Plus } from 'lucide-react';
import AddPostModal from './AddPostModal';
import { IPost } from '../../interface/IPost';
import Axios from '../../api/axios/axios';
import { POST_ENDPOINTS } from '../../api/endpoints/postEndpoints';


const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([])

  const handleSuccess=(newPost:IPost)=>{
    setPosts((prev)=>[newPost,...prev])
  }


async function fetchPost(){
    setLoading(true)
    try {        
        const response = await Axios.get(POST_ENDPOINTS.FETCHPOST)
        if(response.status==200){
            setPosts(response.data.data)
        }
        
    } catch (error) {
        console.log("Error fetching posts",error);
        
    }finally{
        setLoading(false)
    }
}



useEffect(()=>{
    fetchPost()
},[])

return (
    <div className="min-h-screen bg-slate-950 p-6 relative">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-200">Community Posts</h2>
            <p className="text-slate-400">Connect, share, and inspire</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            Add Post
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400 text-center">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-400 text-center text-xl">No posts added yet.Be the first one to add a Post</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-slate-900 rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center p-4 bg-slate-800">
                <img
                  src="/images/user-icon.webp"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
                />
                <div>
                  <h4 className="text-slate-200 font-semibold">{post.username}</h4>
                </div>
              </div>

              <div className="p-4">
                <p className="text-slate-300 mb-4">{post.title}</p>

                <div className="bg-slate-800 rounded-lg overflow-hidden mb-4">
                  <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AddPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Post;