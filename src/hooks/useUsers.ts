// import { ProductData } from "@/interfaces";
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
          : "Error al hacer la solicitud de las compras";

      return { ok: false, data: null, message: errorMessage };
    }
  };

    return { getAllUsers };
};