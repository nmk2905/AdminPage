import axiosInstance from "./main.service";

export const PostService = {
  getAllPosts: async () => {
    const response = await axiosInstance.get("/post/get-all");
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await axiosInstance.delete(`/post/delete/${postId}`);
    return response.data;
  },
};
