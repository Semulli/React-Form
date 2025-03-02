import axios from "axios";

const api = axios.create({
  baseURL: " https://blog-api-t6u0.onrender.com/posts",
});

export const createPosts = async (data) => {
  try {
    const response = await api.post("/", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get("/");
    let filteredData = response.data.filter((el) => el.id > 100);
    console.log(response.data);
    
    return filteredData;

  } catch (error) {
    console.log(error);
  }
};

export const deletePosts = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (id, editedData) => {
  try {
    const response = await api.put(`/${id}`,editedData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
