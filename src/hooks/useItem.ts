import { ItemCreateType } from "@/interface";

import axios from "axios";

const API = axios.create({ baseURL: "/api/procurements/items" });

export const useItem = () => {
  const createItem = async (procId: number, item: ItemCreateType[]) => {
    const { data } = await API.post(`/${procId}`, item);

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? "Error al crear el ítem."
          : "Error desconocido";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateItem = async (
    procurementId: number,
    item: ItemCreateType,
    Item_id: number
  ) => {
    const { data } = await API.put(`/${procurementId}`, { ...item, Item_id });

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

  const deleteItem = async (itemId: number) => {
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

  return { createItem, updateItem, deleteItem };
};
