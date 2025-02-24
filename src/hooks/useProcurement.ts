import procurementSchema from "@/validations/procurementSchema";
import axios from "axios";
import { z } from "zod";

const API = axios.create({ baseURL: "/api/procurements" });

export const useProcurement = () => {
  const getAllProcurements = async () => {
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
          : "Error al obtener las compras.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const getProcurementDetails = async (id: number) => {
    try {
      const { data } = await API.get(`/details/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtene el detalle de la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createProcurement = async (
    newProc: z.infer<typeof procurementSchema>
  ) => {
    try {
      const { data } = await API.post("/", newProc);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateProcurement = async (
    id: number,
    newProc: z.infer<typeof procurementSchema>
  ) => {
    try {
      const { data } = await API.put(`/edit/${id}`, newProc);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message0
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al editar la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const deleteProcurement = async (id: number) => {
    try {
      const { data } = await API.delete(`/details/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message0
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al eliminar la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const processProcurement = async (id: number) => {
    try {
      const { data } = await API.put(`/details/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error del sistema:", error); //* Se cambia del mensaje del error estándar para evitar confuciones.

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message0
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al procesar la compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };


  return {
    getAllProcurements,
    getProcurementDetails,
    createProcurement,
    updateProcurement,
    deleteProcurement,
    processProcurement,
  };
};
