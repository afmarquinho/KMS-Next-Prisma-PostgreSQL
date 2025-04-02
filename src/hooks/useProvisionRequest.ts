import axios from "axios";

const API = axios.create({ baseURL: "/api/provisionRequest" });

export const useProvisionRequest = () => {
  const createProvRequest = async (provRequest: {
    quantity: number;
    note: string;
    id: number;
  }) => {
    try {
      const { data } = await API.post("/", provRequest);
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error en la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear la solicitud.";

      return { ok: false, data: null, message: errorMessage };
    }
  };
 
  const getProvRequest = async () => {
    try {
      const { data } = await API.get("/");
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error en la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al obtener las solicitudes de compra.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return {
    createProvRequest, getProvRequest
  };
};
