import { CustomerPost } from "@/interface";
import axios from "axios";

const API = axios.create({ baseURL: "/api/customers" });

export const useCustomers = () => {
  const getAllCustomers = async () => {
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
          : "Error al obtener los clientes.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createCustomer = async (newCustomer: CustomerPost) => {
    try {
      const { data } = await API.post("/", newCustomer);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el cliente.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updateCustomer = async (dataForm: CustomerPost, customerId: number) => {
    try {
      const { data } = await API.put(`/${customerId}`, dataForm);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al actualizar el cliente";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const getCustomerById = async (id: number) => {
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
          : "Error al obtener el cliente.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return { getAllCustomers, createCustomer, updateCustomer, getCustomerById };
};
