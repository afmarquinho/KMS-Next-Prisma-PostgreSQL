import { productSchema } from "@/validations";
import axios from "axios";
import { z } from "zod";


const API = axios.create({ baseURL: "/api/products" });

export const useReferences = () => {
  const getReferenceList = async () => {
    try {
      const { data } = await API.get(`/`);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error del sistema:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message0
          ? error.response.data.message
          : "Error al obtener el listao de referencias.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const createNewReference = async (body: z.infer<typeof productSchema> ) => {
    try {
      const { data } = await API.post(`/`, {...body, Prod_ref : body.Prod_ref.toUpperCase()});
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error del sistema:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message0
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener los productos.";

      return { ok: false, data: null, message: errorMessage };
    }}

  return { getReferenceList, createNewReference };
};
