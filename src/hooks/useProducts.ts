import axios from "axios";

const API = axios.create({ baseURL: "/api/procurements" });

export const useProducts = () => {
  const getProductList = async () => {
    try {
      const { data } = await API.get(`/products`);
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
    }
  };

  return {
    getProductList,
  };
};
