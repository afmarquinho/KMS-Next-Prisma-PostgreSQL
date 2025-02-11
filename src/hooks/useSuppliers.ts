import { FormValuesSupplierType } from "@/interface";

import axios from "axios";

const API = axios.create({ baseURL: "/api/suppliers" });

export const useSuppliers = () => {
  
  const getAllSuppliers = async () => {
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
          : "Error al obtener los proveedores.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const getSupplierById = async (id: number) => {
    try {
      const { data } = await API.get(`/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener el proveedor.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const activeStatus = async (id: number) => {
    try {
      const { data } = await API.put(`/${id}`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el proveedor.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createSupplier = async (newSupplier: FormValuesSupplierType) => {
    try {
      const { data } = await API.post("/", newSupplier);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el proveedor.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateSupplier = async (id: number, updatedSupplier: FormValuesSupplierType) => {
    try {
      const { data } = await API.put(`/update/${id}`, updatedSupplier);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el proveedor";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return { getAllSuppliers, getSupplierById, activeStatus , createSupplier, updateSupplier};
};
