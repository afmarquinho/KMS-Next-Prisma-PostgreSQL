import { InvrProductDataType } from "@/interface";
import axios from "axios";

const API = axios.create({ baseURL: "/api/inventory" });

export const useInventory = () => {
  const getProcessedProcurements = async () => {
    try {
      const { data } = await API.get("/processed-procurements");
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener las compras procesadas.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const getProcurementInventoryById = async (id: number) => {
    try {
      const { data } = await API.get(`/procurement/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createNote = async (id: number, note: string) => {
    try {
      const { data } = await API.post(`/note/${id}`, { note });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el comentario.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateInventory = async (id: number, product: InvrProductDataType) => {
    try {
      const { data } = await API.put(`/product/${id}`, { product });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el inventario.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const fetchProducts = async (queryString = "") => {
    try {
      const { data } = await API.get(`/management?${queryString}`);
      return {
        ok: data.ok,
        data: data.data,
        message: data.message,
        total: data.total ?? 0,
        page: data.page ?? 1,
        pageSize: data.pageSize ?? 0,
      };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener el inventario.";

      return {
        ok: false,
        data: null,
        message: errorMessage,
        total: 0,
        page: 0,
        pageSize: 0,
      };
    }
  };

  const fetchProductProcurementDetails = async (ref: string, queryString = "") => {
    try {
      const { data } = await API.get(
        `/product/details/procurement/${ref}?${queryString}`
      );
      return {
        ok: data.ok,
        data: data.data,
        message: data.message,
        total: data.total ?? 0,
        page: data.page ?? 1,
        pageSize: data.pageSize ?? 0,
      };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener el inventario.";

      return {
        ok: false,
        data: null,
        message: errorMessage,
        total: 0,
        page: 0,
        pageSize: 0,
      };
    }
  };
  return {
    getProcessedProcurements,
    getProcurementInventoryById,
    createNote,
    updateInventory,
    fetchProducts,
   fetchProductProcurementDetails,
  };
};
