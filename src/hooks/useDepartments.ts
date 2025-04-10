import axios from "axios";

const API = axios.create({ baseURL: "/api/departments" });

export const useDepartment = () => {
  const createDepartment = async (department: string) => {
    
    const { data } = await API.post("/", { Dep_name: department });

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? "Error al crear el departamento."
          : "Error desconocido";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const getDepartments = async () => {
    const { data } = await API.get(`/`);

    try {
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? "Error al obtener los departamentos."
          : "Error desconocido";

      return { ok: false, data: null, message: errorMessage };
    }
  };
  return {
    createDepartment,
    getDepartments,
  };
};
