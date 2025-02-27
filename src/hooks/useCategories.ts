import categorySchema from "@/validations/categorySchema";
import axios from "axios";
import { z } from "zod";

const API = axios.create({ baseURL: "/api/categories" });

export const useCategories = () => {
  const getCategories = async () => {
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
          : "Error al obtener las categorías.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createCategory = async (formValues: z.infer<typeof categorySchema>) => {
    try {
      const { data } = await API.post("/", formValues);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear la categoría.";

      return { ok: false, data: null, message: errorMessage };
    }
  };
  const updateCategory = async (
    id: number,
    formValues: z.infer<typeof categorySchema>
  ) => {
    try {
      const { data } = await API.put(`/${id}`, formValues);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar la categoría.";

      return { ok: false, data: null, message: errorMessage };
    }
  };
  const deleteCategory = async (id: number) => {
    try {
      const { data } = await API.delete(`/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al eliminar la categoría.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return { getCategories, createCategory, updateCategory, deleteCategory };
};
