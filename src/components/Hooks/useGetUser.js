import { useEffect, useState } from "react";
import { getPosts } from "../../services/api";

const useGetUser = () => {
  const [user, setUser] = useState([]);

  const fetchPosts = async () => {
    let data = await getPosts();
    setUser(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {user, fetchPosts}
};

export default useGetUser
