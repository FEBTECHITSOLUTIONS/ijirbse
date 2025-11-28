import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL}`;


// ✅ Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Optional: attach auth token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// ✅ Fetch all users (Editors)


export const getAllUsers = async () => {
  try {
    const { data } = await api.get('/getalluser');
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data || 'Failed to load users';
  }
};

// ✅ Register new user
export const registerUser = async (user) => {
  try {
    const response = await api.post('/register', user);
    return response;
  } catch (error) {
     return error.response.data.message
    console.error('Error registering user:', error);
    // throw error.response?.data || 'Failed to register user';
  }
};

// ✅ Update user
export const updateUser = async (id, user) => {
  try {
    const response  = await api.put(`/updateuser/${id}`, user);
    return response;
    
  } catch (error) {
   setTimeout(() => {
     if(error.status === 401){
      window.localStorage.clear('admin' , "user")
      window.location.reload()
    }
   }, 500);
    return error.response.data.message
    // console.error('Error updating user:', error);
    // throw error.response?.data || 'Failed to update user';
  }
};

// ✅ Delete user
export const deleteUser = async (id) => {
  
  try {
    const response = await api.delete(`/${id}`);
    return response;
  } catch (error) {
    return error.response.data.message
    // console.error('Error deleting user:', error);
    // throw error.response?.data || 'Failed to delete user';
  }
};



// ✅ User Signin
export const signinUser = async (credentials) => {
  console.log(credentials);
  
  try {
    const { data } = await api.post('/signin', credentials);
    console.log(data);
    
    return data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error.response?.data || 'Signin failed';
  }
};


export const getAllUploadedArticles = async () => {
  const { data } = await api.get("/getalluploads");
  return data.data; 
};

export const updateArticleStatus = async (id, status) => {
  const res = await api.put(`/update-status/${id}`, { status });
  return res;
};



export const publishArticle = async(data)=>{
  try {
    const response = await api.post('/publisharticle' , data)
    console.log(response);
    const resData = {
     message: response.data.message,
      status : response.status
    }
    return resData
  } catch (error) {
    console.error("error in publishing article" , error);
    const errData ={
      message:error.response.data.message,
      status: error.response.status
    }
    return errData
  }
}

export const getPublishedArticles = async () => {
  try {
    const response = await api.get("/publishedarticles");
    console.log(response);
    
    return {
      message: response.data.message,
      issues: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("❌ Error fetching published articles:", error);
    return {
      message: error.response?.data?.message || "Failed to fetch published articles",
      status: error.response?.status || 500,
    };
  }
};
