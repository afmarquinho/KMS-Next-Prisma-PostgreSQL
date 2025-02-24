import itemSchema from "@/validations/ItemSchema";
import axios from "axios";
import { z } from "zod";

const API = axios.create({ baseURL: "/api/procurements/items" });

export const useItem = () => {
  const createItem = async (
    proId: number,
    item: z.infer<typeof itemSchema>
  ) => {
    const { data } = await API.post(`/${proId}`, item);

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el ítem.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateItem = async (
    proId: number,
    Item_id: number,
    item: z.infer<typeof itemSchema>
  ) => {
    const { data } = await API.put(`/${proId}`, { ...item, Item_id });

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el ítem.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const deleteItem = async (
    itemId: number
  ) => {
    const { data } = await API.delete(`/${itemId}`);

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al eliminar el ítem.";

      return { ok: false, data: null, message: errorMessage };
    }
  };
  
  return { createItem, updateItem , deleteItem};
};
