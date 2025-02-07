// import { ProductData } from "@/interfaces";
import { UserPost } from "@/interface";
import { User } from "@prisma/client";
import axios from "axios";

const API = axios.create({ baseURL: "/api/users" });

export const useUsers = () => {
  const getAllUsers = async () => {
    try {
      const { data } = await API.get("/");
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener los usuarios.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createUser = async (userPost: UserPost) => {
    try {
      const { data } = await API.post("/", userPost);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el usuario";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateUser = async (
    dataForm: UserPost,
    userId: number,
    status: boolean
  ) => {
    try {
      const { data } = await API.put(`/${userId}`, {
        User_address: dataForm.User_address,
        User_phoneNumber: dataForm.User_phoneNumber,
        User_role: dataForm.User_role,
        User_depId: dataForm.User_depId,
        User_email: dataForm.User_email,
        User_active: status,
      });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el usuario";

      return { ok: false, data: null, message: errorMessage };
    }
  };
  const activeUser = async (userDetails: User) => {
    try {
      const { data } = await API.put(`/${userDetails.User_id}`, {
        User_address: userDetails.User_address,
        User_phoneNumber: userDetails.User_phoneNumber,
        User_role: userDetails.User_role,
        User_depId: userDetails.User_depId,
        User_email: userDetails.User_email,
        User_active: !userDetails.User_active,
      });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el usuario";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return { getAllUsers, createUser, updateUser, activeUser };
};
