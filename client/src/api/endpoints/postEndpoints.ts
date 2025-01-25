const BASE_URL = import.meta.env.VITE_API_URL;


export const POST_ENDPOINTS = {
    ADDNEWPOST: `${BASE_URL}/post/addPost`,
    FETCHPOST: `${BASE_URL}/post/getPosts`
  };
  