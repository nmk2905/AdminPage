import axiosInstance from "./main.service";

export const UserService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("/user/get-all");
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/user/delete/${userId}`);
    return response.data;
  },
};
